import type { Block } from 'blockly';
import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';

const AssertAccountBalance = {
    type: BlockKind.test__assert_account_balance_action,
    message0: 'Account %1 must have %2 balance ',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
        {
            type: 'input_value',
            name: 'BALANCE',
            check: 'Mutez',
        },
    ],
    colour: 300,
};

Blockly.Blocks[AssertAccountBalance.type] = {
    init: function () {
        this.jsonInit(AssertAccountBalance);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(AssertAccountBalance.type, {
    toAction: (block: Block) => {
        const account_name: string = extractVariableName(block, 'NAME');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        return buildAction(ActionKind.AssertAccountBalance, { account_name, balance });
    },
});
