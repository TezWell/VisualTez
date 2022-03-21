import Blockly from 'blockly';

import { TAddress } from '@tezwell/smartts-sdk/type';
import { GetSource } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetSourceBlock = {
    type: BlockKind.get_source_block,
    message0: 'Get Source',
    tooltip: 'Returns the address of the contract that initiated the current transaction.',
    output: ['Expression', 'Address'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_source_block] = {
    init: function () {
        this.jsonInit(GetSourceBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_source_block, {
    toType: () => TAddress(),
    toValue: () => GetSource(),
});
