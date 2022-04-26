import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { Require } from '@tezwell/smartts-sdk/statement';
import { Unit } from '@tezwell/smartts-sdk';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { buildErrorInfo } from '../utils/errorHandling';

const AssertBlock = {
    type: BlockKind.assert_block,
    message0: 'Require %1 or fail with %2',
    args0: [
        {
            type: 'input_value',
            name: 'assert_condition',
            check: ['Literal', 'Expression'],
        },
        { type: 'input_value', name: 'error_message', check: ['Literal', 'Expression'] },
    ],
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[AssertBlock.type] = {
    init: function () {
        this.jsonInit(AssertBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(AssertBlock.type, {
    toStatement: (block: Block) => {
        const failWithMsg = SmartML.toValue(block, 'error_message', Unit());
        const condition = SmartML.toValue(block, 'assert_condition');
        return Require(condition, failWithMsg, buildErrorInfo(block));
    },
});
