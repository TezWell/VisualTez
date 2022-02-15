import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Pair as M_Pair } from '@tezwell/michelson-sdk/literal';
import { TPair as M_TPair } from '@tezwell/michelson-sdk/type';
import { TPair as ST_TPair } from '@tezwell/smartts-sdk/type';
import { Pair as ST_Pair } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const PairBlock = {
    type: BlockKind.pair_literal,
    message0: 'Pair (%1 , %2)',
    args0: [
        { type: 'input_value', name: 'left_value', check: 'Literal' },
        { type: 'input_value', name: 'right_value', check: 'Literal' },
    ],
    inputsInline: true,
    output: ['Literal', 'Pair'],
    colour: 500,
};

Blockly.Blocks[BlockKind.pair_literal] = {
    init: function () {
        this.jsonInit(PairBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.pair_literal, {
    toType: (block: Block) => {
        const left = SmartML.toType(block, 'left_value');
        const right = SmartML.toType(block, 'right_value');
        return ST_TPair(left, right);
    },
    toValue: (block: Block) => {
        const left = SmartML.toValue(block, 'left_value');
        const right = SmartML.toValue(block, 'right_value');
        return ST_Pair(left, right);
    },
});

Michelson.addBlock(BlockKind.pair_literal, {
    toType: (block: Block) => {
        const left = Michelson.toType(block, 'left_value');
        const right = Michelson.toType(block, 'right_value');
        return M_TPair(left, right);
    },
    toMichelson: (block: Block) => {
        const left = Michelson.toMichelson(block, 'left_value');
        const right = Michelson.toMichelson(block, 'right_value');
        return M_Pair(left, right);
    },
});
