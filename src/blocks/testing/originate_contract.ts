import { Block, FieldTextInput, FieldVariable, Procedures } from 'blockly';
import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import Context from '../core/context';
import { buildBlockErrorString } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';
import { findVarName } from '../utils/namespace';

Blockly.Blocks[BlockKind.test__originate_contract_action] = {
    init: function () {
        const initName = findVarName('contract', this.workspace);
        const variableField = new FieldVariable(initName, Procedures.rename);
        const nameField = new FieldTextInput('compilation_x');
        this.appendDummyInput()
            .appendField('Originate contract')
            .appendField(variableField, 'NAME')
            .appendField('from compilation')
            .appendField(nameField, 'CONTRACT_NAME');

        this.appendValueInput('BALANCE').setCheck(['Mutez']).appendField('Balance');
        this.appendValueInput('STORAGE').setCheck(['Literal']).appendField('Storage');

        this.setColour(300);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__originate_contract_action, {
    toAction: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        const contractName: string = block.getFieldValue('CONTRACT_NAME');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        const storage = Michelson.toMichelson(block, 'STORAGE');

        const code = Context.testing.getContract(contractName);
        if (!code) {
            throw Error(`Could not extract contract code. ${buildBlockErrorString(block)}`);
        }

        return buildAction(ActionKind.OriginateContract, {
            name,
            balance,
            code: code || [],
            storage: storage.toJSON() as any,
        });
    },
});
