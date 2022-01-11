import Blockly from 'blockly';

import { TAddress } from '@tezwell/smartts-sdk/core/type';
import { GetSender } from '@tezwell/smartts-sdk/core';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const GetSenderBlock = {
    type: BlockKind.get_sender_block,
    message0: 'Get Sender',
    tooltip: 'Returns the address of the operation sender.',
    output: 'Address',
    colour: 1,
};

Blockly.Blocks[GetSenderBlock.type] = {
    init: function () {
        this.jsonInit(GetSenderBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(GetSenderBlock.type, {
    toType: () => TAddress,
    toValue: () => GetSender(),
});
