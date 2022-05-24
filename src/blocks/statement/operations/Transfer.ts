import { Mutez, ToContract, Transfer, TUnit, Unit } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

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
    tooltip: 'Transfer a given amount to a given address.',
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

        return Transfer(ToContract(address, '', TUnit(), undefined, line), amount, undefined, line).send(line);
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
    tooltip: 'Calls a contract a given amount to a given address.',
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
        const amount: IExpression<any> = SmartML.toValue(block, 'AMOUNT', Mutez(0));
        const argument = SmartML.toValue(block, 'ARGUMENT', Unit());

        const line = buildErrorInfo(block);

        return Transfer(contract, amount, argument, line).send(line);
    },
});
