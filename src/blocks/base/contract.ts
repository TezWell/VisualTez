import Blockly, { Block, FieldTextInput } from 'blockly';

import { Contract, EntryPoint, TUnknown } from '@tezwell/smartts-sdk';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { findName } from '../utils/namespace';
import Context, { ScopeKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';

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
        this.appendDummyInput().appendField('Contract compilation').appendField(nameField, 'NAME');
        this.appendValueInput('TYPE').setCheck(['Type']).appendField('with storage type').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('initial_storage')
            .setCheck(['Literal'])
            .appendField('and initial storage')
            .setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('entry_points')
            .setCheck(['Entrypoint'])
            .appendField('Entry points')
            .setAlign(Blockly.ALIGN_LEFT);
        this.setTooltip('A block that represents a contract');
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

export const extractContract = (block: Block) => {
    // Update current scope to (Contract)
    Context.main.enterScope({
        kind: ScopeKind.Contract,
    });

    const storageType = SmartML.toType(block, 'TYPE', TUnknown());
    const contract = new Contract(buildErrorInfo(block)).setStorageType(storageType);

    // The initial storage is not enforced
    if (block.getInputTargetBlock('initial_storage')) {
        contract.setStorage(SmartML.toValue(block, 'initial_storage'));
    }

    SmartML.toStatements(block, 'entry_points', true).forEach((st) => contract.addEntrypoint(st as EntryPoint));

    // Remove current scope
    Context.main.exitScope();

    console.debug(contract.toString());
    return contract;
};
