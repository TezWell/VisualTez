import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TMap as ST_TMap } from '@tezwell/smartts-sdk/type';
import { TMap as M_TMap } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const MapBlock = {
    type: BlockKind.map_type,
    message0: 'Type | Map (%1 -> %2)',
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
    outputShape: 3,
    colour: 230,
};

Blockly.Blocks[BlockKind.map_type] = {
    init: function () {
        this.jsonInit(MapBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.map_type, {
    toType: (block: Block) => {
        const key_type = SmartML.toType(block, 'key_type');
        const value_type = SmartML.toType(block, 'value_type');
        return ST_TMap(key_type, value_type);
    },
});

Michelson.addBlock(BlockKind.map_type, {
    toType: (block: Block) => {
        const key_type = Michelson.toType(block, 'key_type');
        const value_type = Michelson.toType(block, 'value_type');
        return M_TMap(key_type, value_type);
    },
});
