import { Block } from 'blockly';
import Blockly from 'blockly';

import { Contract } from '@tezwell/smartts-sdk/core';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { randomString } from 'src/utils/rand';

const buildContractBlock = (contractName: string) => ({
    type: BlockKind.contract_block,
    message0: 'Contract %1',
    args0: [
        {
            type: 'field_input',
            name: 'contract_name',
            text: contractName,
        },
    ],
    message1: 'Initial Storage %1',
    args1: [{ type: 'input_value', name: 'initial_storage' }],
    message2: 'Entry points %1',
    args2: [{ type: 'input_statement', name: 'entry_points' }],
    colour: 200,
});

Blockly.Blocks[BlockKind.contract_block] = {
    init: function () {
        this.jsonInit(buildContractBlock(`contract_${randomString()}`));
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML[BlockKind.contract_block] = function (block: Block) {
    const storageValue = SmartML.toValue(block, 'initial_storage');
    return new Contract({
        storage: storageValue as any,
        entries: SmartML.toStatement(block, 'entry_points') as any,
    }).toString();
};
