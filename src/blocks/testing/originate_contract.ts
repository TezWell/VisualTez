import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import Context from '../core/context';
import { buildBlockErrorString } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';
import { findVarName } from '../utils/namespace';
import Logger from 'src/utils/logger';

Blockly.Blocks[BlockKind.test__originate_contract_action] = {
    init: function () {
        const initName = findVarName('contract', this.workspace);
        const variableField = new Blockly.FieldVariable(initName, Blockly.Procedures.rename);
        const multilineField = new Blockly.FieldMultilineInput('compilation_x');
        this.appendDummyInput()
            .appendField('Originate contract')
            .appendField(variableField, 'NAME')
            .appendField('from compilation')
            .appendField(multilineField, 'CONTRACT');

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
        const contract: string = block.getFieldValue('CONTRACT');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        const storage = Michelson.toMichelson(block, 'STORAGE');

        let code = null;
        if (contract.trim().startsWith('[')) {
            // Users can specify the michelson directly
            try {
                code = JSON.parse(contract);
            } catch (e: any) {
                Logger.debug(e);
                throw new Error(`Invalid michelson JSON. ${buildBlockErrorString(block)}`);
            }
        } else {
            // Or reference the code from a contract compilation
            code = Context.testing.getContract(contract);
        }
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
