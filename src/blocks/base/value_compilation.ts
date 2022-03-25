import Blockly, { Block, FieldTextInput } from 'blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { findName } from '../utils/namespace';

Blockly.Blocks[BlockKind.value_compilation] = {
    rename: function (oldName: string) {
        const current = this.getFieldValue('NAME');
        if (!this.oldName) {
            this.oldName = oldName !== 'value_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findName('value', this.workspace, BlockKind.value_compilation);
        const nameField = new FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField('Value compilation')
            .appendField(nameField, 'NAME')
            .setAlign(Blockly.ALIGN_CENTRE);
        this.appendValueInput('value').setCheck(['Literal']).setAlign(Blockly.ALIGN_CENTRE);
        this.setTooltip('A block used to compile a value.');
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(BlockKind.value_compilation, {
    toMichelson: (block: Block) => {
        return Michelson.toMichelson(block, 'value');
    },
});
