import { ToContract, Transfer } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import Blockly, { Block } from 'blockly';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const TransferBlock = {
    type: BlockKind.transfer_statement,
    message0: 'Transfer amount %1 to address %2',
    args0: [
        {
            type: 'input_value',
            name: 'AMOUNT',
            check: ['Literal', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'ADDRESS',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 220,
};

Blockly.Blocks[BlockKind.transfer_statement] = {
    init: function () {
        this.jsonInit(TransferBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.transfer_statement, {
    toStatement: (block: Block) => {
        const amount: IExpression<any> = SmartML.toValue(block, 'AMOUNT');
        const address: IExpression<any> = SmartML.toValue(block, 'ADDRESS');

        const line = buildErrorInfo(block);

        return Transfer(ToContract(address), amount, undefined, line).send(line);
    },
});

const CallContractBlock = {
    type: BlockKind.call_contract_statement,
    message0: 'Call contract %1 with amount %2 and argument %3',
    args0: [
        {
            type: 'input_value',
            name: 'CONTRACT',
            check: ['Literal', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'AMOUNT',
            check: ['Literal', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'ARGUMENT',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 220,
};

Blockly.Blocks[BlockKind.call_contract_statement] = {
    init: function () {
        this.jsonInit(CallContractBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.call_contract_statement, {
    toStatement: (block: Block) => {
        const contract: IExpression<any> = SmartML.toValue(block, 'CONTRACT');
        const amount: IExpression<any> = SmartML.toValue(block, 'AMOUNT');
        const argument = SmartML.toValue(block, 'ARGUMENT');

        const line = buildErrorInfo(block);

        return Transfer(contract, amount, argument, line).send(line);
    },
});
