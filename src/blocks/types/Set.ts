import Blockly, { Block } from 'blockly';

import { TSet as ST_TSet } from '@tezwell/smartts-sdk/type';
import { TSet as M_TSet } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const SetBlock = {
    type: BlockKind.set_type,
    message0: 'Type | Set of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.set_type] = {
    init: function () {
        this.jsonInit(SetBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.set_type, {
    toType: (block: Block) => {
        const type = SmartML.toType(block, 'inner_type');
        return ST_TSet(type);
    },
});

Michelson.addBlock(BlockKind.set_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return M_TSet(type);
    },
});
