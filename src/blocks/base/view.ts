import Blockly from 'blockly';
import { OnChainView, TUnknown } from '@tezwell/smartts-sdk';

import type { Block } from 'src/typings/blockly';

import SmartML from 'src/blocks/generators/SmartML';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';
import BlockKind from '../enums/BlockKind';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';

Blockly.Blocks[BlockKind.onchain_view] = {
    init: function () {
        const initName = Blockly.Procedures.findLegalName('view', this);
        const nameField = new Blockly.FieldTextInput(initName, Blockly.Procedures.rename);

        const storageVariable = new FieldVariableSetter(
            'storage',
            this.renameVar,
            [VariableKind.ContractStorage],
            VariableKind.ContractStorage,
            {
                disabledDropdown: true,
            },
        );
        const argumentVariable = new FieldVariableSetter(
            'parameter',
            this.renameVar,
            [VariableKind.EntrypointOrViewArgument],
            VariableKind.EntrypointOrViewArgument,
            {
                disabledDropdown: true,
            },
        );

        this.appendDummyInput()
            .appendField('View')
            .appendField(nameField, 'NAME')
            .appendField('with arguments (')
            .appendField(argumentVariable, 'ARGUMENT')
            .appendField(', ')
            .appendField(storageVariable, 'STORAGE')
            .appendField(')');
        this.appendValueInput('TYPE').setCheck(['Type']).appendField('and type');
        this.appendStatementInput('CODE').setCheck(['Statement']).appendField('Code');
        this.appendValueInput('RETURN')
            .setCheck(['Literal', 'Expression'])
            .appendField('Return')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip('A block that represents an on-chain view.');
        this.setColour(160);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['View']);
        this.setNextStatement(true, ['View']);
    },
};

SmartML.addBlock(BlockKind.onchain_view, {
    toStatement: (block: Block) => {
        const name = block.getFieldValue('NAME');
        const argumentName = extractVariableName(block, 'ARGUMENT');
        const storageName = extractVariableName(block, 'STORAGE');
        const type = SmartML.toType(block, 'TYPE', TUnknown());

        // Add an (View) scope
        Context.contract.enterScope({
            kind: ScopeKind.View,
            variables: {
                [argumentName]: {
                    kind: VariableKind.EntrypointOrViewArgument,
                    name: argumentName,
                    type,
                },
                [storageName]: {
                    kind: VariableKind.ContractStorage,
                    name: storageName,
                },
            },
        });
        const code = SmartML.toStatements(block, 'CODE', true);

        // Remove current scope
        Context.contract.exitScope();

        return new OnChainView(name, buildErrorInfo(block)).setInputType(type).code(() => code);
    },
});
