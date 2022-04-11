import Blockly, { Block, FieldTextInput } from 'blockly';

import BlockKind from '../enums/BlockKind';
import { findName } from '../utils/namespace';
import Context, { ScopeKind } from '../core/context';
import Testing from '../generators/Testing';
import { ITestAction } from './utils';

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
        const initName = findName('test', this.workspace, BlockKind.contract_block);
        const nameField = new FieldTextInput(initName, (oldName: string) => this.rename(oldName));
        nameField.setSpellcheck(false);
        this.appendDummyInput().appendField('Test').appendField(nameField, 'NAME').setAlign(Blockly.ALIGN_CENTRE);
        this.appendDummyInput().appendField('Actions').setAlign(Blockly.ALIGN_LEFT);
        this.appendStatementInput('TEST_ACTIONS').setCheck(['TestAction']).setAlign(Blockly.ALIGN_LEFT);
        this.setTooltip('A block that represents a test suite.');
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

export const extractTest = (block: Block) => {
    const name: string = block.getFieldValue('NAME');

    // Update current scope to (Contract)
    Context.main.enterScope({
        kind: ScopeKind.Test,
    });

    const actions: ITestAction[] = Testing.toActions(block, 'TEST_ACTIONS', true);

    // Remove current scope
    Context.main.exitScope();

    return {
        name,
        actions,
    };
};
