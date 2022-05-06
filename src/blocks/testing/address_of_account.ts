import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { Address } from '@tezwell/michelson-sdk/literal';
import { PLACEHOLDER } from './placeholder';
import { extractVariableName } from '../utils/variables';
import { FieldVariableGetter } from 'src/components/blockly/overrides/field_variable_getter';

Blockly.Blocks[BlockKind.test__address_of_account] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['implicit_account', 'originated_contract']);
        this.appendDummyInput().appendField('Address of').appendField(contractVariable, 'NAME');
        this.setTooltip('[Testing] - Expands to an address of a given account. Returns a value of type `TAddress`.');
        this.setOutput(true, ['Literal', 'Address']);
        this.setColour(340);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(BlockKind.test__address_of_account, {
    toMichelson: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        return Address(`${PLACEHOLDER.ADDRESS_OF}${name}`);
    },
});
