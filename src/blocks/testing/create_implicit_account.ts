import type { Block } from 'blockly';
import Blockly from 'blockly';
import { buildCreateImplicitAccountAction } from '@tezwell/tezos-testing-sdk';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';

const CreateImplicitAccount = {
    type: BlockKind.test__create_implicit_account,
    message0: 'Create wallet %1 with balance %2 ꜩ',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
        {
            type: 'field_input',
            name: 'BALANCE',
            check: 'Number',
        },
    ],
    colour: 20,
    extensions: ['contextMenu_newGetVariableBlock'],
};

Blockly.Blocks[CreateImplicitAccount.type] = {
    init: function () {
        this.jsonInit(CreateImplicitAccount);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(CreateImplicitAccount.type, {
    toAction: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        const balance: string = block.getFieldValue('BALANCE');
        return buildCreateImplicitAccountAction({ name, balance });
    },
});