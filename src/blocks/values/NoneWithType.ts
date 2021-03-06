import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { None as M_None } from '@tezwell/michelson-sdk/literal';
import { TOption as M_TOption } from '@tezwell/michelson-sdk/type';
import { TOption as ST_TOption } from '@tezwell/smartts-sdk/type';
import { None as ST_None } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const NoneBlock = {
    type: BlockKind.none_with_type_literal,
    message0: 'None of type %1',
    args0: [{ type: 'input_value', name: 'TYPE', check: 'Type' }],
    inputsInline: true,
    output: ['Literal', 'Option'],
    colour: 40,
};

Blockly.Blocks[BlockKind.none_with_type_literal] = {
    init: function () {
        this.jsonInit(NoneBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.none_with_type_literal, {
    toType: (block: Block) => {
        return ST_TOption(SmartML.toType(block, 'TYPE'));
    },
    toValue: (block: Block) => {
        return ST_None(buildErrorInfo(block));
    },
});

Michelson.addBlock(BlockKind.none_with_type_literal, {
    toType: (block: Block) => {
        return M_TOption(Michelson.toType(block, 'TYPE'));
    },
    toMichelson: () => {
        return M_None();
    },
});
