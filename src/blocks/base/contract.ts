import Blockly, { Block, FieldTextInput } from 'blockly';

import type { ILiteral } from '@tezwell/smartts-sdk/typings/literal';
import { Contract, EntryPoint } from '@tezwell/smartts-sdk';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { findName } from '../utils/namespace';
import Context, { ScopeKind } from '../core/context';

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
            .appendField('', 'PARAMS');
        this.appendValueInput('initial_storage').setCheck(['Literal']).appendField('Initial Storage');
        this.appendStatementInput('entry_points').setCheck(['Entrypoint']).appendField('Entry points');
        this.setTooltip('A block that represents a contract');
        this.setColour(200);
        this.setInputsInline(true);
    },
};

SmartML[BlockKind.contract_block] = function (block: Block) {
    // Update current scope to (Contract)
    Context.main.enterScope({
        kind: ScopeKind.Contract,
    });

    const storageType = SmartML.toType(block, 'initial_storage');
    const storageValue = SmartML.toValue(block, 'initial_storage') as ILiteral<unknown>;
    const contract = new Contract().setStorageType(storageType).setStorage(storageValue);

    SmartML.toStatements(block, 'entry_points', true).forEach((st) => contract.addEntrypoint(st as EntryPoint));

    // Remove current scope
    Context.main.exitScope();

    console.debug(contract.toString());
    return contract.toString();
};
