import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Timestamp as M_Timestamp } from '@tezwell/michelson-sdk/literal';
import { TTimestamp as M_TTimestamp } from '@tezwell/michelson-sdk/type';
import { TTimestamp as ST_TTimestamp } from '@tezwell/smartts-sdk/type';
import { Timestamp as ST_Timestamp } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const TimestampBlock = {
    type: BlockKind.timestamp_literal,
    message0: 'Timestamp %1',
    args0: [
        {
            type: 'field_number',
            name: 'value',
            check: 'Number',
        },
    ],
    output: ['Literal', 'Timestamp'],
    colour: 40,
};

Blockly.Blocks[BlockKind.timestamp_literal] = {
    init: function () {
        this.jsonInit(TimestampBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.timestamp_literal, {
    toType: () => {
        return ST_TTimestamp();
    },
    toValue: (block: Block) => {
        return ST_Timestamp(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.timestamp_literal, {
    toType: () => {
        return M_TTimestamp();
    },
    toMichelson: (block: Block) => {
        return M_Timestamp(block.getFieldValue('value'));
    },
});
