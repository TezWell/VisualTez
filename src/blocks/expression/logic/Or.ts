import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { Or } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const OrBlock = {
    type: BlockKind.or,
    message0: '%1 OR %2',
    args0: [
        { type: 'input_value', name: 'LEFT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'RIGHT', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    tooltip: "Boolean and bitwise 'OR'.\n-\n(TBool(), TBool()) => TBool()\n(TNat(), TNat()) => TNat()",
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.or] = {
    init: function () {
        this.jsonInit(OrBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.or, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return Or(left, right, buildErrorInfo(block));
    },
});
