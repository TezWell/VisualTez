import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { Address } from '@tezwell/michelson-sdk/literal';
import { PLACEHOLDER } from './placeholder';
import { extractVariableName } from '../utils/variables';
import { FieldVariableGetter } from 'src/components/blockly/overrides/field_variable_getter';
import settings from 'src/settings.json';

Blockly.Blocks[BlockKind.test__address_of_account] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['implicit_account', 'originated_contract'], {
            default_options: Object.keys(settings.testing_accounts).map((account) => [account, account]),
        });
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

        return Address(`${PLACEHOLDER.ADDRESS_OF}${(settings.testing_accounts as any)[name] || name}`);
    },
});
