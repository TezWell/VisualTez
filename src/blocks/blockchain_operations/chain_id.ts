import Blockly from 'blockly';

import { TChain_id } from '@tezwell/smartts-sdk/type';
import { GetChain_id } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const GetChainIdBlock = {
    type: BlockKind.get_chain_id_block,
    message0: 'Get Chain_id',
    tooltip: 'Returns chain identifier.',
    output: ['Expression', 'Chain_id'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_chain_id_block] = {
    init: function () {
        this.jsonInit(GetChainIdBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_chain_id_block, {
    toType: () => TChain_id(),
    toValue: () => GetChain_id(),
});
