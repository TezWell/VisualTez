import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Add, Divide, Multiply, Subtract } from '@tezwell/smartts-sdk/expression';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const MathBlock = {
    type: BlockKind.math_block,
    message0: '%1 %2 %3',
    args0: [
        {
            type: 'input_value',
            name: 'A',
            check: ['Literal', 'Expression'],
        },
        {
            type: 'field_dropdown',
            name: 'OP',
            options: [
                ['+', 'SUM'],
                ['-', 'SUB'],
                ['*', 'MUL'],
                ['/', 'DIV'],
            ],
        },
        {
            type: 'input_value',
            name: 'B',
            check: ['Literal', 'Expression'],
        },
    ],
    inputsInline: true,
    output: ['Expression'],
    colour: 350,
};

Blockly.Blocks[BlockKind.math_block] = {
    init: function () {
        this.jsonInit(MathBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.math_block, {
    toValue: (block: Block) => {
        const line = buildErrorInfo(block);
        const left = SmartML.toValue(block, 'A');
        const right = SmartML.toValue(block, 'B');
        const operator = block.getFieldValue('OP');

        switch (operator) {
            case 'SUM':
                return Add(left, right, line);
            case 'SUB':
                return Subtract(left, right, line);
            case 'MUL':
                return Multiply(left, right, line);
            case 'DIV':
                return Divide(left, right, line);
        }

        throw new Error(`Unexpected operator ${operator}.`);
    },
});
