import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';
import { FieldVariableGetter } from 'src/components/blockly/FieldVariableGetter';

Blockly.Blocks[BlockKind.test__assert_account_balance_action] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['implicit_account', 'originated_contract']);
        this.appendDummyInput().appendField('Contract').appendField(contractVariable, 'NAME');
        this.appendValueInput('BALANCE').setCheck(['Mutez']).appendField('balance must be');
        this.setInputsInline(true);
        this.setColour(300);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__assert_account_balance_action, {
    toAction: (block: Block) => {
        const account_name: string = extractVariableName(block, 'NAME');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        return buildAction(ActionKind.AssertAccountBalance, { account_name, balance });
    },
});
