import Blockly from 'blockly/core';
import { ContractStorage } from '@tezwell/smartts-sdk/core/expression';

import VARIABLES from '../enums/variables';
import SmartML from '../../generators/SmartML';

const VARIABLE_GETTER_Storage = {
    type: `variable_getter_${VARIABLES.contract_storage}`,
    message0: '%1',
    args0: [
        {
            type: 'field_variable',
            name: 'CONTRACT_STORAGE',
            variable: 'Contract Storage',
            variableTypes: ['ENTRYPOINT_VAR'], // Specifies what types to put in the dropdown
            defaultType: 'ENTRYPOINT_VAR',
        },
    ],
    output: 'ENTRYPOINT_VAR',
    colour: 250,
};

Blockly.Blocks[VARIABLE_GETTER_Storage.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(VARIABLE_GETTER_Storage);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[VARIABLE_GETTER_Storage.type] = {
    toValue: () => ContractStorage(),
};
