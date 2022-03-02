import type { Block } from 'blockly';
import Blockly from 'blockly';

import { TLambda as ST_TLambda, TUnknown } from '@tezwell/smartts-sdk/type';
import { Lambda as ST_Lambda } from '@tezwell/smartts-sdk/expression';
import { Lambda as M_Lambda } from '@tezwell/michelson-sdk/literal';
import Compiler from '@tezwell/smartts-sdk/compiler';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { buildErrorInfo } from '../utils/errorHandling';

Blockly.Blocks[BlockKind.lambda_literal] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.lambda_literal,
            message0: 'Lambda | Argument: %1',
            args0: [
                {
                    type: 'field_variable',
                    name: 'VAR',
                    variable: null,
                },
            ],
            message1: 'Code %1',
            args1: [{ type: 'input_statement', name: 'CODE', check: 'Statement' }],
            inputsInline: true,
            output: ['Literal', 'Lambda'],
            outputShape: 3,
            colour: 60,
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
    toValue: (block: Block) => {
        const argumentName = extractVariableName(block, 'VAR');

        const lambda = ST_Lambda([], TUnknown(), argumentName);

        // Add an (Lambda) scope
        Context.main.enterScope({
            kind: ScopeKind.Lambda,
            id: lambda.id,
            variables: {
                [argumentName]: {
                    kind: VariableKind.LambdaArgument,
                    name: argumentName,
                },
            },
        });

        lambda.code(() => SmartML.toStatements(block, 'CODE', true));

        // Remove current scope
        Context.main.exitScope();

        return lambda;
    },
});

Michelson.addBlock(BlockKind.lambda_literal, {
    toType: () => {
        throw new Error('Lambda literals do not enough information to generate a type.');
    },
    toMichelson: (block: Block) => {
        const argumentName = extractVariableName(block, 'VAR');

        const lambda = ST_Lambda([], TUnknown(), argumentName, buildErrorInfo(block));

        // Add an (Lambda) scope
        Context.main.enterScope({
            kind: ScopeKind.Lambda,
            id: lambda.id,
            variables: {
                [argumentName]: {
                    kind: VariableKind.LambdaArgument,
                    name: argumentName,
                },
            },
        });

        lambda.code(() => SmartML.toStatements(block, 'CODE', true));

        // Remove current scope
        Context.main.exitScope();

        console.error(lambda.toString());

        const compiledLambda = Compiler.compileLambda(lambda.toString());

        if (typeof compiledLambda === 'string') {
            throw new Error(compiledLambda);
        }
        return M_Lambda(compiledLambda.json as any);
    },
});
