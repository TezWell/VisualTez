import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';
import { findVarName } from '../utils/namespace';

Blockly.Blocks[BlockKind.test__create_implicit_account_action] = {
    init: function () {
        const initName = findVarName('wallet', this.workspace);
        const variableField = new Blockly.FieldVariable(initName, Blockly.Procedures.rename);
        this.appendDummyInput().appendField('Create wallet').appendField(variableField, 'NAME');
        this.appendValueInput('BALANCE').setCheck(['Mutez']).appendField('with balance');
        this.setColour(300);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__create_implicit_account_action, {
    toAction: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        return buildAction(ActionKind.CreateImplicitAccount, { name, balance });
    },
});
