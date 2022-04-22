import { Block, FieldTextInput, FieldVariable } from 'blockly';
import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import { extractVariableName } from '../utils/variables';
import { buildBlockErrorString } from '../utils/errorHandling';

Blockly.Blocks[BlockKind.test__call_contract_action] = {
    init: function () {
        const contractVariable = new FieldVariable(null);
        const senderVariable = new FieldVariable(null);
        const entrypointField = new FieldTextInput('default');
        this.appendDummyInput()
            .appendField('Call entrypoint')
            .appendField(entrypointField, 'ENTRYPOINT')
            .appendField('on contract')
            .appendField(contractVariable, 'CONTRACT');

        this.appendDummyInput();
        this.appendValueInput('LEVEL').setCheck(['Nat']).appendField('Block Level');
        this.appendDummyInput();

        this.appendDummyInput().appendField('Sender').appendField(senderVariable, 'SENDER');
        this.appendValueInput('AMOUNT').setCheck(['Mutez']).appendField('Amount');
        this.appendValueInput('ARGUMENT').setCheck(['Literal']).appendField('Argument');

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

        if (level < 1 || level > 99999999) {
            throw new Error(`The block level must be between 1 and 99999999. ${buildBlockErrorString(block)}`);
        }

        return buildAction(ActionKind.CallContract, {
            recipient,
            sender,
            entrypoint,
            amount,
            level,
            parameter: argument as any,
        });
    },
});
