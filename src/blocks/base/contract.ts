import Blockly from 'blockly/core';
import { Contract } from '@tezwell/smartts-sdk/core';

import SmartML from '../../generators/SmartML';

const ContractBlock = {
    type: 'contract_block',
    message0: 'Contract %1',
    args0: [
        {
            type: 'field_input',
            name: 'contract_name',
            text: 'Name',
        },
    ],
    message1: 'Initial Storage %1',
    args1: [{ type: 'input_value', name: 'initial_storage' }],
    message2: 'Entry points %1',
    args2: [{ type: 'input_statement', name: 'entry_points' }],
    colour: 200,
};

Blockly.Blocks[ContractBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(ContractBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML[ContractBlock.type] = function (block: any) {
    const storageValue = SmartML.toValue(block, 'initial_storage');
    return new Contract({
        initialStorage: storageValue,
        entries: SmartML.statementToCode(block, 'entry_points'),
    }).toString();
};
