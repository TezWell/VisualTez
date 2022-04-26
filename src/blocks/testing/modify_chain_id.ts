import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';

const ModifyChainID = {
    type: BlockKind.test__modify_chain_id_action,
    message0: 'Modify chain identifier to %1',
    args0: [
        {
            type: 'input_value',
            name: 'CHAIN_ID',
            check: ['Chain_id'],
        },
    ],
    colour: 300,
};

Blockly.Blocks[ModifyChainID.type] = {
    init: function () {
        this.jsonInit(ModifyChainID);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(ModifyChainID.type, {
    toAction: (block: Block) => {
        const chain_id = String(block.getInputTargetBlock('CHAIN_ID')?.getFieldValue('value'));
        return buildAction(ActionKind.ModifyChainID, { chain_id });
    },
});
