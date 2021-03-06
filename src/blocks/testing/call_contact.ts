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
import { FieldVariableGetter } from 'src/components/blockly/FieldVariableGetter';
import settings from 'src/settings.json';
import { Unit } from '@tezwell/michelson-sdk/literal';

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

        this.appendDummyInput().appendField('Sender').appendField(senderVariable, 'SENDER');
        this.appendValueInput('AMOUNT').setCheck(['Mutez']).appendField('Amount');
        this.appendValueInput('ARGUMENT').setCheck(['Literal']).appendField('Argument');

        // IMPORTANT: Keep this for backwards compatibility
        this.appendValueInput('LEVEL').setCheck(['Nat']).appendField('Mock block level').setVisible(false);
        this.appendValueInput('TIMESTAMP')
            .setCheck(['Timestamp'])
            .appendField('Mock block timestamp')
            .setVisible(false);

        this.appendDummyInput('FAILWITH_INPUT')
            .appendField('Expecting transaction to fail?')
            .appendField(new Blockly.FieldCheckbox(false, this.showFailWithFields.bind(this)), 'EXPECT_FAIL');

        this.setColour(300);
        this.setInputsInline(false);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
    showFailWithFields: function (newValue: string) {
        if (newValue == 'TRUE') {
            this.appendValueInput('EXPECTED_ERROR').setCheck(['Literal']).appendField('with error');
        } else if (this.getInput('EXPECTED_ERROR')) {
            this.removeInput('EXPECTED_ERROR');
        }
        return newValue;
    },
};

Testing.addBlock(BlockKind.test__call_contract_action, {
    toAction: (block: Block) => {
        const recipient: string = extractVariableName(block, 'CONTRACT');
        const sender: string = extractVariableName(block, 'SENDER');
        const entrypoint: string = block.getFieldValue('ENTRYPOINT');
        const amount = String(block.getInputTargetBlock('AMOUNT')?.getFieldValue('value') || 0);
        const argument = Michelson.toMichelson(block, 'ARGUMENT');

        const action: ICallContractPayload = {
            recipient,
            sender: (settings.testing_accounts as any)[sender] || sender,
            entrypoint,
            amount,
            parameter: argument as any,
        };

        if (!recipient) {
            throw new Error(`You must select a contract to be called. ${buildBlockErrorString(block)}`);
        }

        if (!sender) {
            throw new Error(`You must select a sender. ${buildBlockErrorString(block)}`);
        }

        if (!entrypoint.match(/[a-zA-Z0-9_]{1,32}/g)) {
            throw new Error(`The entrypoint name is invalid. ${buildBlockErrorString(block)}`);
        }

        if (block.getFieldValue('EXPECT_FAIL') === 'TRUE') {
            action.expect_failwith = Michelson.toMichelson(block, 'EXPECTED_ERROR', Unit()) as any;
        }

        return buildAction(ActionKind.CallContract, action);
    },
});
