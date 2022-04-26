import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import {
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
} from '@tezwell/smartts-sdk/expression';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';

const CompareBlock = {
    type: BlockKind.compare_block,
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
                ['=', 'EQ'],
                ['\u2260', 'NEQ'],
                ['\u200F<', 'LT'],
                ['\u200F\u2264', 'LTE'],
                ['\u200F>', 'GT'],
                ['\u200F\u2265', 'GTE'],
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
    colour: 200,
};

Blockly.Blocks[CompareBlock.type] = {
    init: function () {
        this.jsonInit(CompareBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(CompareBlock.type, {
    toValue: (block: Block) => {
        const left = SmartML.toValue(block, 'A');
        const right = SmartML.toValue(block, 'B');
        const operator = block.getFieldValue('OP');
        switch (operator) {
            case 'EQ':
                return Equal(left, right);
            case 'NEQ':
                return NotEqual(left, right);
            case 'LT':
                return LessThan(left, right);
            case 'GT':
                return GreaterThan(left, right);
            case 'LTE':
                return LessThanOrEqual(left, right);
            case 'GTE':
                return GreaterThanOrEqual(left, right);
        }
        throw new Error(`Unexpected comparison operator ${operator}.`);
    },
});
