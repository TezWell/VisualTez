import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Key_hash as M_Key_hash } from '@tezwell/michelson-sdk/literal';
import { TKey_hash as M_TKey_hash } from '@tezwell/michelson-sdk/type';
import { TKey_hash as ST_TKey_hash } from '@tezwell/smartts-sdk/type';
import { Key_hash as ST_Key_hash } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Key_hashBlock = {
    type: BlockKind.key_hash_literal,
    message0: 'Key_hash %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Key_hash'],
    colour: 250,
};

Blockly.Blocks[BlockKind.key_hash_literal] = {
    init: function () {
        this.jsonInit(Key_hashBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.key_hash_literal, {
    toType: () => {
        return ST_TKey_hash();
    },
    toValue: (block: Block) => {
        return ST_Key_hash(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.key_hash_literal, {
    toType: () => {
        return M_TKey_hash();
    },
    toMichelson: (block: Block) => {
        return M_Key_hash(block.getFieldValue('value'));
    },
});
