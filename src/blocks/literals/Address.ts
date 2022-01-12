import type { Block } from 'blockly';
import Blockly from 'blockly';

import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const AddressBlock = {
    type: BlockKind.address_literal,
    message0: 'Address %1',
    args0: [
        {
            type: 'field_input',
            name: 'address_value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Address'],
    colour: 20,
};
Blockly.Blocks[BlockKind.address_literal] = {
    init: function () {
        this.jsonInit(AddressBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.address_literal, {
    toType: () => {
        return SmartTSTypes.TAddress;
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Address(block.getFieldValue('address_value'));
    },
});
Michelson.addBlock(BlockKind.address_literal, {
    toType: () => {
        return MichelsonCore.TAddress;
    },
    toMichelson: (block: Block) => {
        return MichelsonCore.Address(block.getFieldValue('address_value'));
    },
});
