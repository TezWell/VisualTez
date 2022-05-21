import Blockly from 'blockly';
import { EntryPoint, TUnknown } from '@tezwell/smartts-sdk';

import type { Block } from 'src/typings/blockly';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';

Blockly.Blocks[BlockKind.entry_point_block] = {
    init: function () {
        const initName = Blockly.Procedures.findLegalName('entrypoint', this);
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
            .appendField('Entrypoint')
            .appendField(nameField, 'NAME')
            .appendField('with arguments (')
            .appendField(argumentVariable, 'ARGUMENT')
            .appendField(', ')
            .appendField(storageVariable, 'STORAGE')
            .appendField(')');
        this.appendValueInput('TYPE').setCheck(['Type']).appendField('and type');
        this.appendStatementInput('CODE').setCheck(['Statement']).appendField('Code');
        this.setTooltip('A block that represents a contract entry point.');
        this.setColour(140);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['Entrypoint']);
        this.setNextStatement(true, ['Entrypoint']);
    },
};

SmartML.addBlock(BlockKind.entry_point_block, {
    toStatement: (block: Block) => {
        const name = block.getFieldValue('NAME');
        const argumentName = extractVariableName(block, 'ARGUMENT');
        const storageName = extractVariableName(block, 'STORAGE');
        const type = SmartML.toType(block, 'TYPE', TUnknown());

        // Add an (Entrypoint) scope
        Context.contract.enterScope({
            kind: ScopeKind.Entrypoint,
            variables: {
                [argumentName]: {
                    kind: VariableKind.EntrypointOrViewArgument,
                    name: argumentName,
                    type: type,
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

        return new EntryPoint(name, buildErrorInfo(block)).setInputType(type).code(() => code);
    },
});
