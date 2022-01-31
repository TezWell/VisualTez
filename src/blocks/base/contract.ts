import Blockly, { Block, FieldTextInput } from 'blockly';

import type { ILiteral } from '@tezwell/smartts-sdk/typings/literal';
import { Contract, EntryPoint } from '@tezwell/smartts-sdk/core';

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
        this.appendStatementInput('entry_points').setCheck('EntryPoint').setAlign(3).appendField('Entry points');
        this.setTooltip('A block that represents a contract');
        this.setColour(200);
    },
};

SmartML[BlockKind.contract_block] = function (block: Block) {
    const storageType = SmartML.toType(block, 'initial_storage');
    const storageValue = SmartML.toValue(block, 'initial_storage') as ILiteral;
    const contract = new Contract().setStorageType(storageType).setStorage(storageValue);

    SmartML.toStatements(block, 'entry_points').forEach((st) => contract.addEntrypoint(st as EntryPoint));

    console.debug(contract.toString());
    return contract.toString();
};
