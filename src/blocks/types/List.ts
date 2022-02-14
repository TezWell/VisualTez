import Blockly, { Block } from 'blockly';

import { TList as ST_TList } from '@tezwell/smartts-sdk/type';
import { TList as M_TList } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const ListBlock = {
    type: BlockKind.list_type,
    message0: 'Type: List of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    colour: 330,
};

Blockly.Blocks[BlockKind.list_type] = {
    init: function () {
        this.jsonInit(ListBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.list_type, {
    toType: (block: Block) => {
        const type = SmartML.toType(block, 'inner_type');
        return ST_TList(type);
    },
});

Michelson.addBlock(BlockKind.list_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return M_TList(type);
    },
});
