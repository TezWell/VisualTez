import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { MatchVariant } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { IStatement } from '@tezwell/smartts-sdk/typings/statement';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { findVarName } from '../utils/namespace';
import { FieldVariableSetter } from 'src/components/blockly/FieldVariableSetter';

const MatchVariantBlock = {
    type: BlockKind.match_variant,
    message0: 'Match variant %1 with cases %2',
    args0: [
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        { type: 'input_statement', name: 'CASES', check: ['MatchCase'] },
    ],
    tooltip: 'A switch case for variant values of type TOption() or TOr().',
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[BlockKind.match_variant] = {
    init: function () {
        this.jsonInit(MatchVariantBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
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
    args1: [{ type: 'input_statement', name: 'DO', check: ['Statement'] }],
    colour: 30,
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[BlockKind.match_variant_case] = {
    renameCase: function (oldName: string) {
        if (oldName.match(/^[a-zA-Z0-9_]+$/)) {
            return oldName;
        }
        return this.getFieldValue('CASE');
    },
    renameVar: function (oldName: string) {
        // TODO: Add variable validation
    },
    init: function () {
        const initName = findVarName('case_arg', this.workspace);
        const variableField = new FieldVariableSetter(
            initName,
            this.renameVar,
            [VariableKind.VariantArgument],
            VariableKind.VariantArgument,
        );

        const caseField = new Blockly.FieldTextInput('', (name: string) => this.renameCase(name));
        this.appendDummyInput()
            .appendField('Case')
            .appendField(caseField, 'CASE')
            .appendField('with argument')
            .appendField(variableField, 'VAR');

        this.appendStatementInput('DO').setCheck(['Statement']).appendField('Do');

        this.setColour(30);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['MatchCase']);
        this.setNextStatement(true, ['MatchCase']);
    },
};

const getMatchCase = (block: Block): [string, string, IStatement[]] => {
    const variant: string = block.getFieldValue('CASE');
    const variantArgumentName = extractVariableName(block, 'VAR');

    // Add a (MatchCase) scope
    Context.contract.enterScope({
        kind: ScopeKind.MatchCase,
        variables: {
            [variantArgumentName]: {
                kind: VariableKind.VariantArgument,
                name: variantArgumentName,
            },
        },
    });

    const instructions = SmartML.toStatements(block, 'DO', true);

    // Remove current scope
    Context.contract.exitScope();

    return [variant, variantArgumentName, instructions];
};
