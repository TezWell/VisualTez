import type { Block } from 'blockly';
import Blockly from 'blockly';

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

Blockly.Blocks[BlockKind.lambda_literal] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.lambda_literal,
            message0: 'Lambda with argument %1 of type %2',
            args0: [
                {
                    type: 'field_variable',
                    name: 'VAR',
                    variable: null,
                },
                {
                    type: 'input_value',
                    name: 'TYPE',
                    check: ['Type'],
                },
            ],
            message1: 'Code %1',
            args1: [{ type: 'input_statement', name: 'CODE', check: ['Statement'] }],
            message2: 'Return %1',
            args2: [{ type: 'input_value', name: 'RETURN', check: ['Literal', 'Expression'], align: 'RIGHT' }],
            inputsInline: true,
            output: ['Literal', 'Lambda'],
            outputShape: 3,
            colour: 40,
            extensions: ['contextMenu_newGetVariableBlock'],
        });
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
