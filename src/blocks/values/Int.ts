import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Int as M_Int } from '@tezwell/michelson-sdk/literal';
import { TInt as M_TInt } from '@tezwell/michelson-sdk/type';
import { TInt as ST_TInt } from '@tezwell/smartts-sdk/type';
import { Int as ST_Int } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const IntBlock = {
    type: BlockKind.int_literal,
    message0: 'Int %1',
    args0: [
        {
            type: 'field_number',
            name: 'int_value',
            check: 'Number',
        },
    ],
    output: ['Literal', 'Int'],
    colour: 40,
};
Blockly.Blocks[BlockKind.int_literal] = {
    init: function () {
        this.jsonInit(IntBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.int_literal, {
    toType: () => {
        return ST_TInt();
    },
    toValue: (block: Block) => {
        return ST_Int(Number(block.getFieldValue('int_value')), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.int_literal, {
    toType: () => {
        return M_TInt();
    },
    toMichelson: (block: Block) => {
        return M_Int(Number(block.getFieldValue('int_value')));
    },
});
