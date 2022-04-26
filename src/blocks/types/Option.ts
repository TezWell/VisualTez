import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TOption as ST_TOption } from '@tezwell/smartts-sdk/type';
import { TOption as M_TOption } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const OptionBlock = {
    type: BlockKind.option_type,
    message0: 'Type | Option of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    outputShape: 3,
    colour: 230,
};

Blockly.Blocks[BlockKind.option_type] = {
    init: function () {
        this.jsonInit(OptionBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.option_type, {
    toType: (block: Block) => {
        const type = SmartML.toType(block, 'inner_type');
        return ST_TOption(type);
    },
});

Michelson.addBlock(BlockKind.option_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return M_TOption(type);
    },
});
