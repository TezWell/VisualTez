import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { validateTimestamp } from '../values/Timestamp';

const ModifyBlock = {
    type: BlockKind.test__modify_block_timestamp,
    message0: 'Modify next block timestamp to %1',
    args0: [
        {
            type: 'input_value',
            name: 'TIMESTAMP',
            check: ['Timestamp'],
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
        const timestamp = validateTimestamp(block.getInputTargetBlock('TIMESTAMP')!);

        return buildAction(ActionKind.ModifyBlockTimestamp, { timestamp });
    },
});
