import Blockly, { Block } from 'blockly';
import { MatchVariant } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { IStatement } from '@tezwell/smartts-sdk/typings/statement';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

const MatchVariantBlock = {
    type: BlockKind.match_variant,
    message0: 'Match variant %1 with cases %2',
    args0: [
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        { type: 'input_statement', name: 'CASES' },
    ],
    colour: 200,
    output: ['Statement'],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[BlockKind.match_variant] = {
    init: function () {
        this.jsonInit(MatchVariantBlock);
    },
};

SmartML.addBlock(BlockKind.match_variant, {
    toStatement: (block: Block) => {
        const expression: IExpression<any> = SmartML.toValue(block, 'VALUE');
        const matchStatement = MatchVariant(expression, undefined, buildErrorInfo(block));

        let targetBlock = block.getInputTargetBlock('CASES');
        if (!targetBlock) {
            throw new Error('MatchVariant is empty.');
        }

        do {
            const [variant, variantArgumentName, stmts] = getMatchCase(targetBlock);

            matchStatement.Case(variant, () => stmts, variantArgumentName);
        } while ((targetBlock = targetBlock.getNextBlock()));

        return matchStatement;
    },
});

const MatchCaseBlock = {
    type: BlockKind.match_variant_case,
    message0: 'Case %1 with argument %2',
    args0: [
        { type: 'field_input', name: 'CASE' },
        {
            type: 'field_variable',
            name: 'VAR',
            variable: null,
        },
    ],
    message1: 'Do %1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    colour: 200,
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[BlockKind.match_variant_case] = {
    init: function () {
        this.jsonInit(MatchCaseBlock);
    },
};

const getMatchCase = (block: Block): [string, string, IStatement[]] => {
    const variant: string = block.getFieldValue('CASE');
    const variantArgumentName = extractVariableName(block, 'VAR');

    // Add a (MatchCase) scope
    Context.main.enterScope({
        kind: ScopeKind.MatchCase,
        variables: {
            [variant]: {
                kind: VariableKind.VariantArgument,
                name: variantArgumentName,
            },
        },
    });

    const instructions = SmartML.toStatements(block, 'DO', true);

    // Remove current scope
    Context.main.exitScope();

    return [variant, variantArgumentName, instructions];
};
