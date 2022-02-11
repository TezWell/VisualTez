import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Add, Sub, Mul, Div } from '@tezwell/smartts-sdk/expression';
import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';

const MathBlock = {
    type: BlockKind.math_block,
    message0: '%1 %2 %3',
    args0: [
        {
            type: 'input_value',
            name: 'A',
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
        },
    ],
    inputsInline: true,
    output: ['Number', 'String', 'Bytes'],
    style: 'logic_blocks',
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
                return Add(left, right);
            case 'SUB':
                return Sub(left, right);
            case 'MUL':
                return Mul(left, right);
            case 'DIV':
                return Div(left, right);
        }
        throw new Error(`Unexpected operator ${operator}.`);
    },
});
