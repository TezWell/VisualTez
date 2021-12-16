import Blockly from 'blockly/core';
import { TAddress } from '@tezwell/smartts-sdk/core/type';
import { Sender } from '@tezwell/smartts-sdk/core';
import SmartML from '../../generators/SmartML';

const OperationSender = {
    type: 'operation_sender_block',
    message0: 'Get Sender',
    tooltip: 'Returns the address of the operation sender.',
    output: 'Address',
    colour: 1,
};

Blockly.Blocks[OperationSender.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(OperationSender);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};
SmartML.blocks[OperationSender.type] = {
    toType: () => TAddress,
    toValue: () => Sender(),
};
