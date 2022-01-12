import { Block, FieldTextInput, Procedures } from 'blockly';
import Blockly from 'blockly';
import { EntryPoint } from '@tezwell/smartts-sdk/core';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

Blockly.Blocks[BlockKind.entry_point_block] = {
    ...Blockly.Blocks['procedures_defnoreturn'],
    init: function () {
        const initName = Procedures.findLegalName('entrypoint', this);
        const nameField = new FieldTextInput(initName, Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput().appendField('Entrypoint').appendField(nameField, 'NAME').appendField('', 'PARAMS');
        this.appendValueInput('input_type').setCheck(['Type']).appendField('Input Type');
        this.setStyle('procedure_blocks');
        this.setTooltip('A block that represents an entry point.');
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(true);
        this.setColour(140);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.statementConnection_ = null;
    },
};

SmartML.addBlock(BlockKind.entry_point_block, {
    toStatement: (block: Block) => {
        const name = block.getFieldValue('NAME');
        return new EntryPoint(name).code(() => SmartML.toStatement(block, 'entry_point_code')).toString();
    },
});
