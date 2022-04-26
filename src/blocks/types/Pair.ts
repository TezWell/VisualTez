import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TPair as ST_TPair } from '@tezwell/smartts-sdk/type';
import { TPair as M_TPair } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const PairBlock = {
    type: BlockKind.pair_type,
    message0: 'Type | Pair (%1 , %2)',
    args0: [
        {
            type: 'input_value',
            name: 'left_type',
            check: 'Type',
        },
        {
            type: 'input_value',
            name: 'right_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    outputShape: 3,
    colour: 230,
};

Blockly.Blocks[BlockKind.pair_type] = {
    init: function () {
        this.jsonInit(PairBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.pair_type, {
    toType: (block: Block) => {
        const left_type = SmartML.toType(block, 'left_type');
        const right_type = SmartML.toType(block, 'right_type');
        return ST_TPair(left_type, right_type);
    },
});

Michelson.addBlock(BlockKind.pair_type, {
    toType: (block: Block) => {
        const left_type = Michelson.toType(block, 'left_type');
        const right_type = Michelson.toType(block, 'right_type');
        return M_TPair(left_type, right_type);
    },
});
