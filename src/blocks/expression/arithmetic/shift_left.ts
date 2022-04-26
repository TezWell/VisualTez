import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { ShiftLeft } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const ShiftLeftBlock = {
    type: BlockKind.shift_left_expression,
    message0: 'Shift Left (%1 << %2)',
    args0: [
        {
            type: 'input_value',
            name: 'LEFT',
            check: ['Nat', 'Int', 'Mutez', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'RIGHT',
            check: ['Nat', 'Int', 'Mutez', 'Expression'],
        },
    ],
    tooltip: `Logically left shift a natural number.\n-\n(TNat(), TNat()) => TNat()`,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.shift_left_expression] = {
    init: function () {
        this.jsonInit(ShiftLeftBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.shift_left_expression, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return ShiftLeft(left, right, buildErrorInfo(block));
    },
});
