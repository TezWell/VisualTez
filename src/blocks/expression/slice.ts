import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { Slice } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const SliceBlock = {
    type: BlockKind.slice,
    message0: 'Slice %1 from %2 to %3',
    args0: [
        { type: 'input_value', name: 'BYTES', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'OFFSET', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'LENGTH', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.slice] = {
    init: function () {
        this.jsonInit(SliceBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.slice, {
    toValue: (block: Block) => {
        const bytes: IExpression<any> = SmartML.toValue(block, 'BYTES');
        const offset: IExpression<any> = SmartML.toValue(block, 'OFFSET');
        const length: IExpression<any> = SmartML.toValue(block, 'LENGTH');
        return Slice(bytes, offset, length, buildErrorInfo(block));
    },
});
