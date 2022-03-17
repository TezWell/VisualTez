import { Block, FieldTextInput, Procedures } from 'blockly';
import Blockly from 'blockly';
import { EntryPoint } from '@tezwell/smartts-sdk';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Context, { ScopeKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';

Blockly.Blocks[BlockKind.entry_point_block] = {
    init: function () {
        const initName = Procedures.findLegalName('entrypoint', this);
        const nameField = new FieldTextInput(initName, Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput().appendField('Entrypoint').appendField(nameField, 'NAME');
        this.appendValueInput('input_type').setCheck(['Type']).appendField('with input type');
        this.appendStatementInput('entry_point_code').setCheck(['Statement']).appendField('Code');
        this.setTooltip('A block that represents an entry point.');
        this.setOutput(false, 'Entrypoint');
        this.setColour(140);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['Entrypoint']);
        this.setNextStatement(true, ['Entrypoint']);
    },
};

SmartML.addBlock(BlockKind.entry_point_block, {
    toStatement: (block: Block) => {
        // Add an (Entrypoint) scope
        Context.main.enterScope({
            kind: ScopeKind.Entrypoint,
            variables: {},
        });

        const name = block.getFieldValue('NAME');
        const type = SmartML.toType(block, 'input_type');
        const code = SmartML.toStatements(block, 'entry_point_code', true);

        // Remove current scope
        Context.main.exitScope();

        return new EntryPoint(name, buildErrorInfo(block)).setInputType(type).code(() => code);
    },
});
