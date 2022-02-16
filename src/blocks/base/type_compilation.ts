import Blockly, { Block, FieldTextInput } from 'blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { findName } from '../utils/namespace';

Blockly.Blocks[BlockKind.type_compilation] = {
    rename: function (oldName: string) {
        const current = this.getFieldValue('NAME');
        if (!this.oldName) {
            this.oldName = oldName !== 'type_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findName('type', this.workspace, BlockKind.type_compilation);
        const nameField = new FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField('Type compilation')
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('type').setCheck(['Type']).appendField('Type');
        this.setTooltip('A block used to compile a type.');
        this.setColour(300);
    },
};

Michelson.addBlock(BlockKind.type_compilation, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'type');
        console.error(type);
        return type;
    },
});
