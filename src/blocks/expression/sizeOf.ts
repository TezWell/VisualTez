import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { SizeOf } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const SizeOfBlock = {
    type: BlockKind.size_of,
    message0: 'Size of %1',
    args0: [{ type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] }],
    colour: 200,
    tooltip: 'Obtain size of a string, list, set, map or byte sequence bytes.\n-\nTNat()',
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.size_of] = {
    init: function () {
        this.jsonInit(SizeOfBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.size_of, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return SizeOf(value, buildErrorInfo(block));
    },
});
