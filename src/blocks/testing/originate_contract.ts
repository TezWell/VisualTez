import type { Block } from 'blockly';
import Blockly from 'blockly';
import { buildOriginateContractAction } from '@tezwell/tezos-testing-sdk';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';
import Context from '../core/context';
import { buildBlockErrorString } from '../utils/errorHandling';
import { extractVariableName } from '../utils/variables';

const OriginateContract = {
    type: BlockKind.test__originate_contract,
    message0: 'Originate contract %1 from compilation %2',
    args0: [
        {
            type: 'field_variable',
            name: 'NAME',
            variable: null,
        },
        {
            type: 'field_input',
            name: 'CONTRACT_NAME',
            text: 'contract_x',
            check: 'String',
        },
    ],
    message1: 'Storage %1',
    args1: [
        {
            type: 'input_value',
            name: 'STORAGE',
            check: 'Literal',
        },
    ],
    message2: 'Balance %1',
    args2: [
        {
            type: 'input_value',
            name: 'BALANCE',
            check: ['Mutez'],
        },
    ],
    colour: 300,
    extensions: ['contextMenu_newGetVariableBlock'],
};

Blockly.Blocks[OriginateContract.type] = {
    init: function () {
        this.jsonInit(OriginateContract);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(OriginateContract.type, {
    toAction: (block: Block) => {
        const name: string = extractVariableName(block, 'NAME');
        const contractName: string = block.getFieldValue('CONTRACT_NAME');
        const balance = String(block.getInputTargetBlock('BALANCE')?.getFieldValue('value'));
        const storage = Michelson.toMichelson(block, 'STORAGE');

        const code = Context.testing.getContract(contractName);
        if (!code) {
            throw Error(`Could not extract contract code. ${buildBlockErrorString(block)}`);
        }

        return buildOriginateContractAction({ name, balance, code: code || [], storage: storage.toJSON() as any });
    },
});
