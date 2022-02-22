import Blockly from 'blockly';

import { TAddress } from '@tezwell/smartts-sdk/type';
import { GetSelfAddress } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const Block = {
    type: BlockKind.get_current_contract_address_block,
    message0: 'Get contract address',
    tooltip: 'Returns the address of the current contract.',
    output: ['Expression', 'Address'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_current_contract_address_block] = {
    init: function () {
        this.jsonInit(Block);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_current_contract_address_block, {
    toType: () => TAddress(),
    toValue: () => GetSelfAddress(),
});
