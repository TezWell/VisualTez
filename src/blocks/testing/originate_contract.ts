import Blockly from 'blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import { Block } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import Context from '../core/context';
import { extractVariableName } from '../utils/variables';
import { findVarName } from '../utils/namespace';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';
import { CompilationSelection } from 'src/components/blockly/overrides/compilation_selection';

Blockly.Blocks[BlockKind.test__originate_contract_action] = {
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
        const compilationField = new CompilationSelection();

        this.appendDummyInput()
            .appendField('Originate contract')
            .appendField(variableField, 'NAME')
            .appendField('from compilation')
            .appendField(compilationField, 'CONTRACT');

        this.appendValueInput('BALANCE').setCheck(['Mutez']).appendField('Initial balance');
        this.appendValueInput('STORAGE').setCheck(['Literal']).appendField('Initial storage');

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

        return buildAction(ActionKind.OriginateContract, {
            name,
            balance,
            code: Context.testing.getContract(contract) || [],
            storage: storage.toJSON() as any,
        });
    },
});
