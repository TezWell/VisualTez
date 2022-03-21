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
    helpUrl: '%{BKY_LOGIC_COMPARE_HELPURL}',
    extensions: ['logic_compare', 'logic_op_tooltip'],
};

Blockly.Blocks[MathBlock.type] = {
    init: function () {
        this.jsonInit(MathBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(MathBlock.type, {
    toValue: (block: Block) => {
        const left = SmartML.toValue(block, 'A');
        const right = SmartML.toValue(block, 'B');
        const operator = block.getFieldValue('OP');
        switch (operator) {
            case 'SUM':
                return Add(left, right, buildErrorInfo(block));
            case 'SUB':
                return Subtract(left, right, buildErrorInfo(block));
            case 'MUL':
                return Multiply(left, right, buildErrorInfo(block));
            case 'DIV':
                return Divide(left, right, buildErrorInfo(block));
        }
        throw new Error(`Unexpected operator ${operator}.`);
    },
});
