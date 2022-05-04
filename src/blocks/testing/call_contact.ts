import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind, ICallContractPayload } from '@tezwell/tezos-testing-sdk/action';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import { extractVariableName } from '../utils/variables';
import { buildBlockErrorString } from '../utils/errorHandling';
import { validateTimestamp } from '../values/Timestamp';
import { FieldVariableGetter } from 'src/components/blockly/overrides/field_variable_getter';
import settings from 'src/settings.json';

Blockly.Blocks[BlockKind.test__call_contract_action] = {
    init: function () {
        const contractVariable = new FieldVariableGetter(undefined, ['implicit_account', 'originated_contract']);
        const senderVariable = new FieldVariableGetter(undefined, ['implicit_account'], {
            default_options: Object.keys(settings.testing_accounts).map((account) => [account, account]),
        });
        const entrypointField = new Blockly.FieldTextInput('default');

        this.appendDummyInput()
            .appendField('Call entrypoint')
            .appendField(entrypointField, 'ENTRYPOINT')
            .appendField('on contract')
            .appendField(contractVariable, 'CONTRACT');

        this.appendDummyInput();
        this.appendValueInput('LEVEL').setCheck(['Nat']).appendField('Block Level');
        this.appendValueInput('TIMESTAMP').setCheck(['Timestamp']).appendField('Block Timestamp');
        this.appendDummyInput();

        this.appendDummyInput().appendField('Sender').appendField(senderVariable, 'SENDER');
        this.appendValueInput('AMOUNT').setCheck(['Mutez']).appendField('Amount');
        this.appendValueInput('ARGUMENT').setCheck(['Literal']).appendField('Argument');
        this.appendDummyInput();

        const expectDropDown = new Blockly.FieldDropdown([
            ['Succeed', 'succeed'],
            ['Fail', 'fail'],
        ]);
        this.appendDummyInput().appendField('Expecting transaction to').appendField(expectDropDown, 'EXPECT');

        this.setColour(300);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__call_contract_action, {
    toAction: (block: Block) => {
        const recipient: string = extractVariableName(block, 'CONTRACT');
        const sender: string = extractVariableName(block, 'SENDER');
        const entrypoint: string = block.getFieldValue('ENTRYPOINT');
        const amount = String(block.getInputTargetBlock('AMOUNT')?.getFieldValue('value'));
        const level = Number(block.getInputTargetBlock('LEVEL')?.getFieldValue('nat_value'));
        const argument = Michelson.toMichelson(block, 'ARGUMENT');
        const expect: string = block.getFieldValue('EXPECT');

        const action: ICallContractPayload = {
            recipient,
            sender: (settings.testing_accounts as any)[sender] || sender,
            entrypoint,
            amount,
            parameter: argument as any,
            expect_failure: expect === 'fail',
        };

        const timestampBlock = block.getInputTargetBlock('TIMESTAMP');
        if (timestampBlock) {
            action.timestamp = validateTimestamp(timestampBlock);
        }

        if (level < 1 || level > 99999999) {
            throw new Error(`The block level must be between 1 and 99999999. ${buildBlockErrorString(block)}`);
        }
        action.level = level;

        return buildAction(ActionKind.CallContract, action);
    },
});
