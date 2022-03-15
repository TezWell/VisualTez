import Blockly, { Block } from 'blockly';

import { TBig_map as ST_TBig_map } from '@tezwell/smartts-sdk/type';
import { TBig_map as M_TBig_map } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BigMapBlock = {
    type: BlockKind.big_map_type,
    message0: 'Type | Big_map (%1 -> %2)',
    args0: [
        {
            type: 'input_value',
            name: 'key_type',
            check: 'Type',
        },
        {
            type: 'input_value',
            name: 'value_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.big_map_type] = {
    init: function () {
        this.jsonInit(BigMapBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.big_map_type, {
    toType: (block: Block) => {
        const key_type = SmartML.toType(block, 'key_type');
        const value_type = SmartML.toType(block, 'value_type');
        return ST_TBig_map(key_type, value_type);
    },
});

Michelson.addBlock(BlockKind.big_map_type, {
    toType: (block: Block) => {
        const key_type = Michelson.toType(block, 'key_type');
        const value_type = Michelson.toType(block, 'value_type');
        return M_TBig_map(key_type, value_type);
    },
});
