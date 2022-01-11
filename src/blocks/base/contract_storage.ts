import Blockly from 'blockly';

import { ContractStorage } from '@tezwell/smartts-sdk/core/expression';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';

const GetContractStorageBlock = {
    type: BlockKind.get_contract_storage,
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

Blockly.Blocks[GetContractStorageBlock.type] = {
    init: function () {
        this.jsonInit(GetContractStorageBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(GetContractStorageBlock.type, {
    toValue: () => ContractStorage(),
});
