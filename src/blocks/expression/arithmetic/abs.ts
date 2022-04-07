import type { Block } from 'blockly';
import Blockly from 'blockly';

import { ABS } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const ABSBlock = {
    type: BlockKind.abs_expression,
    message0: 'ABS %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Int', 'Expression'],
        },
    ],
    tooltip: `
        Obtain the absolute value of an integer.\n-\n
        TInt() => TNat()
    `,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.abs_expression] = {
    init: function () {
        this.jsonInit(ABSBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.abs_expression, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return ABS(value, buildErrorInfo(block));
    },
});
