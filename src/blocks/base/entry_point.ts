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
        const variableField = new FieldVariableSetter(
            'entrypoint_argument',
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
            .appendField('with argument')
            .appendField(variableField, 'ARGUMENT');
        this.appendValueInput('TYPE').setCheck(['Type']).appendField('of type');
        this.appendStatementInput('CODE').setCheck(['Statement']).appendField('Code');
        this.setTooltip('A block that represents an entry point.');
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
            },
        });
        const code = SmartML.toStatements(block, 'CODE', true);

        // Remove current scope
        Context.contract.exitScope();

        return new EntryPoint(name, buildErrorInfo(block)).setInputType(type).code(() => code);
    },
});
