import Blockly from 'blockly/core';
import { TAddress } from '@tezwell/smartts-sdk/core/type';
import { Address } from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../../generators/SmartML';

const AddressBlock = {
    type: 'address_block',
    message0: 'Address %1',
    args0: [
        {
            type: 'field_input',
            name: 'address_value',
            check: 'String',
        },
    ],
    output: 'Address',
    colour: 20,
};
Blockly.Blocks[AddressBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(AddressBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[AddressBlock.type] = {
    toType: () => {
        return TAddress;
    },
    toValue: (block: any) => {
        return Address(block.getFieldValue('address_value'));
    },
};
