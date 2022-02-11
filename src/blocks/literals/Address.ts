import type { Block } from 'blockly';
import Blockly from 'blockly';

import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartTSTypes from '@tezwell/smartts-sdk/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/expression';
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
        return SmartTSTypes.TAddress();
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Address(block.getFieldValue('address_value'));
    },
});
Michelson.addBlock(BlockKind.address_literal, {
    toType: () => {
        return MichelsonType.TAddress();
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Address(block.getFieldValue('address_value'));
    },
});
