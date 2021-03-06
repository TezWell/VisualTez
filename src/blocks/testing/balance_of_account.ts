import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { PLACEHOLDER } from './placeholder';
import { extractVariableName } from '../utils/variables';
import { Mutez } from '@tezwell/michelson-sdk/literal';
import { FieldVariableGetter } from 'src/components/blockly/FieldVariableGetter';
import settings from 'src/settings.json';

Blockly.Blocks[BlockKind.test__balance_of_account] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['implicit_account', 'originated_contract'], {
            default_options: Object.keys(settings.testing_accounts).map((account) => [account, account]),
        });
        this.appendDummyInput().appendField('Balance of').appendField(contractVariable, 'NAME');
        this.setTooltip('[Testing] - Expends to the balance of a given account. Returns a value of type `TMutez`.');
        this.setColour(340);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, ['Literal', 'Mutez']);
    },
};

Michelson.addBlock(BlockKind.test__balance_of_account, {
    toMichelson: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        return Mutez(`${PLACEHOLDER.BALANCE_OF}${(settings.testing_accounts as any)[name] || name}`);
    },
});
