import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Key as M_Key } from '@tezwell/michelson-sdk/literal';
import { TKey as M_TKey } from '@tezwell/michelson-sdk/type';
import { TKey as ST_TKey } from '@tezwell/smartts-sdk/type';
import { Key as ST_Key } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const KeyBlock = {
    type: BlockKind.key_literal,
    message0: 'Key %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Key'],
    colour: 40,
};

Blockly.Blocks[BlockKind.key_literal] = {
    init: function () {
        this.jsonInit(KeyBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.key_literal, {
    toType: () => {
        return ST_TKey();
    },
    toValue: (block: Block) => {
        return ST_Key(block.getFieldValue('value'), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.key_literal, {
    toType: () => {
        return M_TKey();
    },
    toMichelson: (block: Block) => {
        return M_Key(block.getFieldValue('value'));
    },
});
