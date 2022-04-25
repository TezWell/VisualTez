import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Timestamp as M_Timestamp } from '@tezwell/michelson-sdk/literal';
import { TTimestamp as M_TTimestamp } from '@tezwell/michelson-sdk/type';
import { TTimestamp as ST_TTimestamp } from '@tezwell/smartts-sdk/type';
import { Timestamp as ST_Timestamp } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildBlockErrorString, buildErrorInfo } from '../utils/errorHandling';

const TimestampBlock = {
    type: BlockKind.timestamp_literal,
    message0: 'Timestamp %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            text: '1970-01-01T00:00:00Z',
            check: 'String',
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
        const timestamp = validateTimestamp(block);
        return ST_Timestamp(Number(Number(Date.parse(timestamp) / 1000).toFixed(0)), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.timestamp_literal, {
    toType: () => {
        return M_TTimestamp();
    },
    toMichelson: (block: Block) => {
        return M_Timestamp(validateTimestamp(block));
    },
});

export const validateTimestamp = (block: Block) => {
    const value: string = block.getFieldValue('value');
    console.error(value);
    if (value.includes('Z')) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error(`The timestamp is invalid. (Expected RFC3339 notation). ${buildBlockErrorString(block)}`);
        }
        return value;
    }
    const number = Number(block.getFieldValue('value'));
    if (number < 0) {
        throw new Error(`Cannot take negative values. ${buildBlockErrorString(block)}`);
    }
    // Convert seconds to date and encode it using RFC3339 date format
    return new Date(number * 1000).toISOString().replace(/[.]\d{3}Z/g, 'Z');
};
