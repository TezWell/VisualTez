import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import { extractVariableName } from '../utils/variables';
import Michelson from '../generators/Michelson';
import { FieldVariableGetter } from 'src/components/blockly/overrides/field_variable_getter';

Blockly.Blocks[BlockKind.test__assert_contract_storage_action] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['originated_contract']);
        this.appendDummyInput().appendField('Contract').appendField(contractVariable, 'NAME');
        this.appendValueInput('STORAGE').setCheck(['Literal']).appendField('storage must be');
        this.setInputsInline(true);
        this.setColour(300);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__assert_contract_storage_action, {
    toAction: (block: Block) => {
        const contract_name: string = extractVariableName(block, 'NAME');
        const storage = Michelson.toMichelson(block, 'STORAGE');
        return buildAction(ActionKind.AssertContractStorage, { contract_name, storage: storage.toJSON() as any });
    },
});
