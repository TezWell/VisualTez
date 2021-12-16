import { TNat } from '@tezwell/smartts-sdk/core/type';
import { Nat } from '@tezwell/smartts-sdk/core/literal';
import Blockly from 'blockly/core';
import SmartML from '../../generators/SmartML';

const NatBlock = {
    type: 'nat_block',
    message0: 'Nat %1',
    args0: [
        {
            type: 'field_input',
            name: 'nat_value',
            check: 'Number',
        },
    ],
    output: 'Number',
    colour: 10,
};

Blockly.Blocks[NatBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(NatBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[NatBlock.type] = {
    toType: () => TNat,
    toValue: (block: any) => {
        return Nat(Number(block.getFieldValue('nat_value')));
    },
};
