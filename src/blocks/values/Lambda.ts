import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { TLambda as ST_TLambda, TUnknown } from '@tezwell/smartts-sdk/type';
import { Lambda as ST_Lambda, Unit } from '@tezwell/smartts-sdk/expression';
import { Lambda as M_Lambda } from '@tezwell/michelson-sdk/literal';
import { Return } from '@tezwell/smartts-sdk/statement';

import Compiler from '@tezwell/smartts-sdk/compiler';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { buildErrorInfo } from '../utils/errorHandling';
import { MichelsonJSON } from '@tezwell/michelson-sdk/typings';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';

Blockly.Blocks[BlockKind.lambda_literal] = {
    init: function () {
        const variableField = new FieldVariableSetter(
            'lambda_argument',
            this.renameVar,
            [VariableKind.LambdaArgument],
            VariableKind.LambdaArgument,
            {
                disabledDropdown: true,
            },
        );

        this.appendDummyInput()
            .appendField('Lambda with argument (')
            .appendField(variableField, 'VAR')
            .appendField(')');
        this.appendValueInput('TYPE').setCheck(['Type']).appendField('of type');

        this.appendStatementInput('CODE').setCheck(['Statement']).appendField('Code');
        this.appendValueInput('RETURN')
            .setCheck(['Literal', 'Expression'])
            .appendField('Return')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setOutput(true, ['Literal', 'Lambda']);
        this.setOutputShape(3);
        this.setColour(40);
        this.setInputsInline(true);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.lambda_literal, {
    toType: () => {
        return ST_TLambda(TUnknown(), TUnknown());
    },
    toValue: getLambdaExpression,
});

Michelson.addBlock(BlockKind.lambda_literal, {
    toType: () => {
        throw new Error('Lambda literals do not enough information to generate a type.');
    },
    toMichelson: (block: Block) => {
        const lambda = getLambdaExpression(block);
        const compiledLambda = Compiler.compileValue(lambda);

        if (typeof compiledLambda === 'string') {
            throw new Error(compiledLambda);
        }
        return M_Lambda(compiledLambda.json as MichelsonJSON);
    },
});

function getLambdaExpression(block: Block) {
    const argumentName = extractVariableName(block, 'VAR');
    const type = SmartML.toType(block, 'TYPE', TUnknown());

    const lambda = ST_Lambda([], type, argumentName, buildErrorInfo(block));

    // Add an (Lambda) scope
    Context.contract.enterScope({
        kind: ScopeKind.Lambda,
        id: lambda.id,
        variables: {
            [argumentName]: {
                kind: VariableKind.LambdaArgument,
                type: type,
                name: argumentName,
            },
        },
    });

    const statements = SmartML.toStatements(block, 'CODE', true);
    const returnValue = Return(SmartML.toValue(block, 'RETURN', Unit()), buildErrorInfo(block));
    lambda.code(() => [...statements, returnValue]);

    // Remove current scope
    Context.contract.exitScope();

    return lambda;
}
