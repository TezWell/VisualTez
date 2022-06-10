import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { buildBlockErrorString } from '../utils/errorHandling';

const ModifyBlock = {
    type: BlockKind.test__modify_block_level,
    message0: 'Modify next block level to %1',
    args0: [
        {
            type: 'input_value',
            name: 'LEVEL',
            check: ['Nat'],
        },
    ],
    colour: 300,
};

Blockly.Blocks[ModifyBlock.type] = {
    init: function () {
        this.jsonInit(ModifyBlock);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(ModifyBlock.type, {
    toAction: (block: Block) => {
        const level = Number(block.getInputTargetBlock('LEVEL')?.getFieldValue('nat_value') || 1);

        if (level < 1 || level > 99999999) {
            throw new Error(`The block level must be between 1 and 99999999. ${buildBlockErrorString(block)}`);
        }

        return buildAction(ActionKind.ModifyBlockLevel, { level });
    },
});
