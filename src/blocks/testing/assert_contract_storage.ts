import type { Block } from 'blockly';
import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';
import Michelson from '../generators/Michelson';

const AssertContractStorage = {
    type: BlockKind.test__assert_contract_storage_action,
    message0: 'Contract %1 storage must be %2',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
        {
            type: 'input_value',
            name: 'STORAGE',
            check: ['Literal'],
        },
    ],
    colour: 300,
};

Blockly.Blocks[AssertContractStorage.type] = {
    init: function () {
        this.jsonInit(AssertContractStorage);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(AssertContractStorage.type, {
    toAction: (block: Block) => {
        const contract_name: string = extractVariableName(block, 'NAME');
        const storage = Michelson.toMichelson(block, 'STORAGE');
        return buildAction(ActionKind.AssertContractStorage, { contract_name, storage: storage.toJSON() as any });
    },
});
