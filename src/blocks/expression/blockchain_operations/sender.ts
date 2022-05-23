import Blockly from 'blockly';

import { TAddress } from '@tezwell/smartts-sdk/type';
import { GetSender } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetSenderBlock = {
    type: BlockKind.get_sender_block,
    message0: 'Get Sender',
    tooltip: 'Returns the address of the operation sender.\n-\nTAddress()',
    output: ['Expression', 'Address'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_sender_block] = {
    init: function () {
        this.jsonInit(GetSenderBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_sender_block, {
    toType: () => TAddress(),
    toValue: () => GetSender(),
});
