import type { Block } from 'blockly';
import Blockly from 'blockly';

import { EuclideanDivision } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const EdivBlock = {
    type: BlockKind.ediv_expression,
    message0: 'Euclidean division (%1 / %2)',
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
    tooltip: `
        Perform euclidean division.\n-\n
        (TNat(), TNat()) => TOption(TPair(TNat(), TNat()))\n
        (TNat(), TInt()) => TOption(TPair(TInt(), TNat()))\n
        (TInt(), TNat()) => TOption(TPair(TInt(), TNat()))\n
        (TMutez(), TNat()) => TOption(TPair(TMutez(), TMutez()))\n
        (TMutez(), TMutez()) => TOption(TPair(TNat(), TMutez()))
    `,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.ediv_expression] = {
    init: function () {
        this.jsonInit(EdivBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.ediv_expression, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return EuclideanDivision(left, right, buildErrorInfo(block));
    },
});
