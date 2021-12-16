import {
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
} from '@tezwell/smartts-sdk/core/expression';
import Blockly from 'blockly';
import SmartML from '../../generators/SmartML';

const CompareBlock = {
    type: 'logic_compare',
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
        },
    ],
    inputsInline: true,
    output: 'Boolean',
    style: 'logic_blocks',
    helpUrl: '%{BKY_LOGIC_COMPARE_HELPURL}',
    extensions: ['logic_compare', 'logic_op_tooltip'],
};

Blockly.Blocks[CompareBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(CompareBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[CompareBlock.type] = {
    toValue: (block: any) => {
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
};
