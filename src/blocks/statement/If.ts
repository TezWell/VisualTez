import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { If } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { buildErrorInfo } from '../utils/errorHandling';

const IfBlock = {
    type: BlockKind.if_block,
    message0: 'If %1',
    args0: [
        {
            type: 'input_value',
            name: 'condition',
            check: ['Expression', 'Literal'],
        },
    ],
    message1: 'Then %1',
    args1: [
        {
            type: 'input_statement',
            name: 'then_statements',
            check: 'Statement',
        },
    ],
    message2: 'Else %1',
    args2: [
        {
            type: 'input_statement',
            name: 'else_statements',
            check: 'Statement',
        },
    ],
    tooltip: 'Conditional branching (if then .. else ...).',
    colour: 20,
};

Blockly.Blocks[BlockKind.if_block] = {
    init: function () {
        this.jsonInit(IfBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.if_block, {
    toStatement: (block: Block) => {
        const condition = SmartML.toValue(block, 'condition');

        const thenStatements = SmartML.toStatements(block, 'then_statements', true);
        const elseStatements = SmartML.toStatements(block, 'else_statements', true);

        return If(condition, thenStatements, elseStatements, buildErrorInfo(block));
    },
});
