import type { Block } from 'blockly';
import Blockly from 'blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { Address } from '@tezwell/michelson-sdk/literal';
import { PLACEHOLDER } from './placeholder';
import { extractVariableName } from '../utils/variables';

const AddressOfAccount = {
    type: BlockKind.test__address_of_account,
    message0: 'Address of %1',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
    ],
    tooltip: '[Testing] - Get the address of an account not yet created. Returns a value of type `TAddress`.',
    output: ['Literal'],
    colour: 340,
};

Blockly.Blocks[AddressOfAccount.type] = {
    init: function () {
        this.jsonInit(AddressOfAccount);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(AddressOfAccount.type, {
    toMichelson: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        return Address(`${PLACEHOLDER.ADDRESS_OF}${name}`);
    },
});
