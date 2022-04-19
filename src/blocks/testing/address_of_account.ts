import type { Block } from 'blockly';
import Blockly from 'blockly';

import BlockKind from '../enums/BlockKind';
import { extractVariableName } from '../utils/variables';
import Michelson from '../generators/Michelson';
import { Address } from '@tezwell/michelson-sdk/literal';
import { PLACEHOLDER } from './placeholder';

const GetAccountAddress = {
    type: BlockKind.test__address_of_account,
    message0: 'Address of %1',
    args0: [
        {
            type: 'field_input',
            name: 'NAME',
            check: 'String',
        },
    ],
    output: ['Literal', 'Expression'],
    colour: 300,
    extensions: ['contextMenu_newGetVariableBlock'],
};

Blockly.Blocks[GetAccountAddress.type] = {
    init: function () {
        this.jsonInit(GetAccountAddress);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(GetAccountAddress.type, {
    toMichelson: (block: Block) => {
        const name: string = block.getFieldValue('NAME');
        return Address(`${PLACEHOLDER.ADDRESS_OF}${name}`);
    },
});
