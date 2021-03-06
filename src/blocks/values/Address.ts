import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Address as M_Address } from '@tezwell/michelson-sdk/literal';
import { TAddress as M_TAddress } from '@tezwell/michelson-sdk/type';
import { TAddress as ST_TAddress } from '@tezwell/smartts-sdk/type';
import { Address as ST_Address } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildBlockErrorString, buildErrorInfo } from '../utils/errorHandling';

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
    colour: 40,
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
        return ST_TAddress();
    },
    toValue: (block: Block) => {
        return ST_Address(validate(block), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.address_literal, {
    toType: () => {
        return M_TAddress();
    },
    toMichelson: (block: Block) => {
        return M_Address(validate(block));
    },
});

const validate = (block: Block) => {
    const expectedPrefix = ['KT1', 'tz1', 'tz2', 'tz3'];
    const address: string = block.getFieldValue('address_value');
    if (!expectedPrefix.includes(address.slice(0, 3))) {
        throw new Error(`The address is invalid. ${buildBlockErrorString(block)}`);
    }
    return address;
};
