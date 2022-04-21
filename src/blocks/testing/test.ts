import Blockly, { Block, FieldDropdown, FieldTextInput } from 'blockly';
import { IAction } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import { findName } from '../utils/namespace';
import Context, { ScopeKind } from '../core/context';
import Testing from '../generators/Testing';
import settings from 'src/settings.json';

Blockly.Blocks[BlockKind.test] = {
    rename: function (oldName: string) {
        const current = this.getFieldValue('NAME');
        if (!this.oldName) {
            this.oldName = oldName !== 'test_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findName('test', this.workspace, BlockKind.test);
        const nameField = new FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        const protocolDropDown = new FieldDropdown(settings.protocols.map(({ name, id }) => [name, id]));
        this.appendDummyInput()
            .appendField('Test')
            .appendField(nameField, 'NAME')
            .appendField('on protocol')
            .appendField(protocolDropDown, 'PROTOCOL');

        this.appendDummyInput();
        this.appendDummyInput().appendField('Performing the following actions:').setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('TEST_ACTIONS').setCheck(['TestAction']).setAlign(Blockly.ALIGN_LEFT);
        this.setTooltip('A block that represents a test suite.');
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

export const extractTest = (block: Block) => {
    const name: string = block.getFieldValue('NAME');
    const protocol: string = block.getFieldValue('PROTOCOL');
    console.error(protocol);

    // Update current scope
    Context.contract.enterScope({
        kind: ScopeKind.Test,
    });

    const actions: IAction[] = Testing.toActions(block, 'TEST_ACTIONS', true);

    // Remove current scope
    Context.contract.exitScope();

    return {
        name,
        suite: {
            protocol,
            actions,
        },
    };
};
