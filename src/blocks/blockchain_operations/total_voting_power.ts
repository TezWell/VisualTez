import Blockly from 'blockly';

import { TNat } from '@tezwell/smartts-sdk/type';
import { GetTotalVotingPower } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const GetTotalVotingPowerBlock = {
    type: BlockKind.get_total_voting_power_block,
    message0: 'Get total voting power',
    tooltip: 'Returns the total voting power of all contracts.',
    output: ['Expression', 'Nat'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_total_voting_power_block] = {
    init: function () {
        this.jsonInit(GetTotalVotingPowerBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_total_voting_power_block, {
    toType: () => TNat(),
    toValue: () => GetTotalVotingPower(),
});
