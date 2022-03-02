import type { Block } from 'blockly';
import Blockly from 'blockly';
import { Return } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { buildErrorInfo } from '../utils/errorHandling';

const ReturnBlock = {
    type: BlockKind.return_statement_block,
    message0: 'Return %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            checks: ['Expression', 'Literal'],
        },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[BlockKind.return_statement_block] = {
    init: function () {
        this.jsonInit(ReturnBlock);
    },
};

SmartML.addBlock(BlockKind.return_statement_block, {
    toStatement: (block: Block) => {
        const value = SmartML.toValue(block, 'VALUE');
        return Return(value, buildErrorInfo(block));
    },
});
