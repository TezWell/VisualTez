import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TOr as ST_TOr } from '@tezwell/smartts-sdk/type';
import { TOr as M_TOr } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const OrBlock = {
    type: BlockKind.or_type,
    message0: 'Type | Or (%1 , %2)',
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

Blockly.Blocks[BlockKind.or_type] = {
    init: function () {
        this.jsonInit(OrBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.or_type, {
    toType: (block: Block) => {
        const left_type = SmartML.toType(block, 'left_type');
        const right_type = SmartML.toType(block, 'right_type');
        return ST_TOr(left_type, right_type);
    },
});

Michelson.addBlock(BlockKind.or_type, {
    toType: (block: Block) => {
        const left_type = Michelson.toType(block, 'left_type');
        const right_type = Michelson.toType(block, 'right_type');
        return M_TOr(left_type, right_type);
    },
});
