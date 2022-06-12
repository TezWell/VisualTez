import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Median } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const MedianBlock = {
    type: BlockKind.abs_expression,
    message0: 'Compute median of %1',
    args0: [
        {
            type: 'input_value',
            name: 'LIST',
            check: ['List', 'Expression'],
        },
    ],
    tooltip: `
        Compute the median of a list of integers.\n-\n
        TList(TInt()) => TInt()\n
        TList(TNat()) => TNat()
    `,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.median_expression] = {
    init: function () {
        this.jsonInit(MedianBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.median_expression, {
    toValue: (block: Block) => {
        const list: IExpression<any> = SmartML.toValue(block, 'LIST');
        return Median(list, buildErrorInfo(block));
    },
});
