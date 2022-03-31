import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Some as M_Some } from '@tezwell/michelson-sdk/literal';
import { TOption as M_TOption } from '@tezwell/michelson-sdk/type';
import { TOption as ST_TOption } from '@tezwell/smartts-sdk/type';
import { Some as ST_Some } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const SomeBlock = {
    type: BlockKind.some_literal,
    message0: 'Some %1',
    args0: [{ type: 'input_value', name: 'option_value', check: ['Literal', 'Expression'] }],
    inputsInline: true,
    output: ['Literal', 'Option'],
    colour: 40,
};

Blockly.Blocks[BlockKind.some_literal] = {
    init: function () {
        this.jsonInit(SomeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.some_literal, {
    toType: (block: Block) => {
        return ST_TOption(SmartML.toType(block, 'option_value'));
    },
    toValue: (block: Block) => {
        return ST_Some(SmartML.toValue(block, 'option_value'), buildErrorInfo(block));
    },
});

Michelson.addBlock(BlockKind.some_literal, {
    toType: (block: Block) => {
        return M_TOption(Michelson.toType(block, 'option_value'));
    },
    toMichelson: (block: Block) => {
        return M_Some(Michelson.toMichelson(block, 'option_value'));
    },
});
