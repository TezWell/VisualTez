import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { PLACEHOLDER } from './placeholder';
import { extractVariableName } from '../utils/variables';
import { Mutez } from '@tezwell/michelson-sdk/literal';

const BalanceOfAccount = {
    type: BlockKind.test__balance_of_account,
    message0: 'Balance of %1',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
    ],
    tooltip: '[Testing] - Get the balance of an account not yet created. Returns a value of type `TMutez`.',
    output: ['Literal', 'Expression'],
    colour: 340,
    extensions: ['contextMenu_variableSetterGetter'],
};

Blockly.Blocks[BalanceOfAccount.type] = {
    init: function () {
        this.jsonInit(BalanceOfAccount);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(BalanceOfAccount.type, {
    toMichelson: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        return Mutez(`${PLACEHOLDER.BALANCE_OF}${name}`);
    },
});
