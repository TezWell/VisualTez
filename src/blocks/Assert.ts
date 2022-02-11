import type { Block } from 'blockly';
import Blockly from 'blockly';
import { Require } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from './enums/BlockKind';

const AssertBlock = {
    type: BlockKind.assert_block,
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
        this.jsonInit(AssertBlock);
    },
};

SmartML.addBlock(AssertBlock.type, {
    toStatement: (block: Block) => {
        const failWithMsg = SmartML.toValue(block, 'error_message');
        const condition = SmartML.toValue(block, 'assert_condition');
        return Require(condition, failWithMsg);
    },
});
