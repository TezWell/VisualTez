import Blockly from 'blockly';

import { TTimestamp } from '@tezwell/smartts-sdk/type';
import { GetTimestamp } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetTimestampBlock = {
    type: BlockKind.get_timestamp_block,
    message0: 'Get Block Timestamp',
    tooltip: 'Returns block timestamp.\n-\nTTimestamp()',
    output: ['Expression', 'Timestamp'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_timestamp_block] = {
    init: function () {
        this.jsonInit(GetTimestampBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_timestamp_block, {
    toType: () => TTimestamp(),
    toValue: () => GetTimestamp(),
});
