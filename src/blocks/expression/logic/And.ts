import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { And } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const AndBlock = {
    type: BlockKind.and,
    message0: '%1 AND %2',
    args0: [
        { type: 'input_value', name: 'LEFT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'RIGHT', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    tooltip:
        "Boolean and bitwise 'AND'.\n-\n(TBool(), TBool()) => TBool()\n(TNat(), TNat()) => TNat()\n(TInt(), TNat()) => TNat()\n",
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.and] = {
    init: function () {
        this.jsonInit(AndBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.and, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return And(left, right, buildErrorInfo(block));
    },
});
