import Blockly from 'blockly';

import { TNat } from '@tezwell/smartts-sdk/type';
import { GetLevel } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const BlockLevel = {
    type: BlockKind.get_level_block,
    message0: 'Get Level',
    tooltip: 'Returns the level of the head block.\n-\nTNat()',
    output: ['Expression', 'Nat'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_level_block] = {
    init: function () {
        this.jsonInit(BlockLevel);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_level_block, {
    toType: () => TNat(),
    toValue: () => GetLevel(),
});
