import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Bytes as M_Bytes } from '@tezwell/michelson-sdk/literal';
import { TBytes as M_TBytes } from '@tezwell/michelson-sdk/type';
import { TBytes as ST_TBytes } from '@tezwell/smartts-sdk/type';
import { Bytes as ST_Bytes } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BytesBlock = {
    type: BlockKind.bytes_literal,
    message0: 'Bytes %1',
    args0: [
        {
            type: 'field_input',
            name: 'bytes',
            text: '',
            check: 'String',
        },
    ],
    output: ['Literal', 'Bytes'],
    colour: 40,
};

Blockly.Blocks[BlockKind.bytes_literal] = {
    init: function () {
        this.jsonInit(BytesBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bytes_literal, {
    toType: () => {
        return ST_TBytes();
    },
    toValue: (block: Block) => {
        return ST_Bytes(block.getFieldValue('bytes'));
    },
});
Michelson.addBlock(BlockKind.bytes_literal, {
    toType: () => {
        return M_TBytes();
    },
    toMichelson: (block: Block) => {
        return M_Bytes(block.getFieldValue('bytes'));
    },
});
