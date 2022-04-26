import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { Xor } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const XorBlock = {
    type: BlockKind.xor,
    message0: '%1 XOR %2',
    args0: [
        { type: 'input_value', name: 'LEFT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'RIGHT', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.xor] = {
    init: function () {
        this.jsonInit(XorBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.xor, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return Xor(left, right, buildErrorInfo(block));
    },
});
