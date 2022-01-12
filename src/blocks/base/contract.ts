import Blockly, { Block, FieldTextInput } from 'blockly';

import { Contract } from '@tezwell/smartts-sdk/core';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { findName } from '../utils/namespace';

Blockly.Blocks[BlockKind.contract_block] = {
    rename: function (oldName: string) {
        const current = this.getFieldValue('NAME');
        if (!this.oldName) {
            this.oldName = oldName !== 'contract_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findName('contract', this.workspace, BlockKind.contract_block);
        const nameField = new FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        nameField.setSpellcheck(false);
        this.appendDummyInput().appendField('Contract').appendField(nameField, 'NAME').appendField('', 'PARAMS');
        this.appendValueInput('initial_storage').setCheck(['Literal']).appendField('Initial Storage');
        this.appendStatementInput('entry_points').setCheck(['EntryPoint']).appendField('Entry points');
        this.setStyle('procedure_blocks');
        this.setTooltip('A block that represents a contract');
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setColour(200);
    },
};

SmartML[BlockKind.contract_block] = function (block: Block) {
    const storageValue = SmartML.toValue(block, 'initial_storage');
    console.error(storageValue);
    return new Contract({
        storage: storageValue as any,
        entries: SmartML.toStatement(block, 'entry_points') as any,
    }).toString();
};
