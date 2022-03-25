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
        this.appendDummyInput()
            .appendField('Contract compilation')
            .appendField(nameField, 'NAME')
            .setAlign(Blockly.ALIGN_CENTRE);
        this.appendDummyInput().appendField('Storage Type').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('TYPE').setCheck(['Type']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Initial Storage (Optional)').setAlign(Blockly.ALIGN_LEFT);
        this.appendValueInput('initial_storage').setCheck(['Literal']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('Entry points').setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('entry_points').setCheck(['Entrypoint']).setAlign(Blockly.ALIGN_LEFT);
        this.appendDummyInput().appendField('On-Chain Views').setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('ONCHAIN_VIEWS').setCheck(['View']).setAlign(Blockly.ALIGN_LEFT);
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

    SmartML.toStatements(block, 'entry_points', true).forEach((st) => contract.addEntrypoint(st as EntryPoint));

    // Remove current scope
    Context.main.exitScope();

    return contract;
};
