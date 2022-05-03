import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import type { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import { buildBlockErrorString } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';
import { findVarName } from '../utils/namespace';
import Logger from 'src/utils/logger';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';

Blockly.Blocks[BlockKind.test__originate_contract_from_code_action] = {
    renameVar: function (oldName: string) {
        if (!this.oldName) {
            const current = this.getFieldValue('NAME');
            this.oldName = oldName !== 'contract_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const variableType = 'originated_contract';

        const initName = findVarName('contract', this.workspace);
        const variableField = new FieldVariableSetter(initName, this.renameVar, [variableType], variableType);
        const multilineField = new Blockly.FieldMultilineInput('\n\t  \t  \t\n\n\n\n\n\n\n');

        this.appendDummyInput().appendField('Originate contract').appendField(variableField, 'NAME');
        this.appendDummyInput().appendField('Micheline Code').appendField(multilineField, 'CONTRACT');

        this.appendValueInput('BALANCE').setCheck(['Mutez']).appendField('Balance');
        this.appendValueInput('STORAGE').setCheck(['Literal']).appendField('Storage');

        this.setColour(300);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(BlockKind.test__originate_contract_from_code_action, {
    toAction: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        const contract: string = block.getFieldValue('CONTRACT');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        const storage = Michelson.toMichelson(block, 'STORAGE');

        let code = [];
        if (contract.trim().startsWith('[')) {
            try {
                code = JSON.parse(contract);
            } catch (e: any) {
                Logger.debug(e);
                throw new Error(`Invalid michelson JSON. ${buildBlockErrorString(block)}`);
            }
        } else {
            throw Error(`Could not extract contract code. ${buildBlockErrorString(block)}`);
        }

        return buildAction(ActionKind.OriginateContract, {
            name,
            balance,
            code: code,
            storage: storage.toJSON() as any,
        });
    },
});
