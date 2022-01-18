import Blockly, { Block } from 'blockly';

import { TOption } from '@tezwell/smartts-sdk/core/type';
import MichelsonTypes from '@tezwell/michelson-sdk/core/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const OptionBlock = {
    type: BlockKind.option_type,
    message0: 'Type: Option of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    colour: 101,
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
        return TOption(type);
    },
});

Michelson.addBlock(BlockKind.option_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return MichelsonTypes.TOption(type);
    },
});
