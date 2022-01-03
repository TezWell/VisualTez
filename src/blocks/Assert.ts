import Blockly from 'blockly/core';
import { Require } from '@tezwell/smartts-sdk/core/command';

import SmartML from '../generators/SmartML';

const AssertBlock = {
    type: 'assert_block',
    message0: 'Require %1',
    args0: [
        {
            type: 'input_value',
            name: 'assert_condition',
            check: 'Boolean',
        },
    ],
    message1: 'Fail with %1',
    args1: [{ type: 'input_value', name: 'error_message' }],
    colour: 200,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[AssertBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(AssertBlock);
    },
};

SmartML.blocks[AssertBlock.type] = {
    toStatement: (block: any) => {
        const failWithMsg = SmartML.toValue(block, 'error_message');
        const condition = SmartML.toValue(block, 'assert_condition');
        return Require(condition, failWithMsg);
    },
};
