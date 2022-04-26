import Blockly from 'blockly';
import { IAction } from '@tezwell/tezos-testing-sdk/action';

import type { Block } from 'src/typings/blockly';

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
        const nameField = new Blockly.FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        const protocolDropDown = new Blockly.FieldDropdown(settings.protocols.map(({ name, id }) => [name, id]));
        this.appendDummyInput()
            .appendField('Test suite')
            .appendField(nameField, 'NAME')
            .appendField('running protocol')
            .appendField(protocolDropDown, 'PROTOCOL');

        this.appendStatementInput('TEST_ACTIONS').setCheck(['TestAction']).setAlign(Blockly.ALIGN_LEFT);
        this.setTooltip('A block that represents a test suite.\n-\nchain_id: NetXynUjJNZm7wi');
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

export const extractTest = (block: Block) => {
    const name: string = block.getFieldValue('NAME');
    const protocol: string = block.getFieldValue('PROTOCOL');

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
