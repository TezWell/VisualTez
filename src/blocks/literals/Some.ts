import type { Block } from 'blockly';
import Blockly from 'blockly';

import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { ILiteral } from '@tezwell/smartts-sdk/typings/literal';
import Michelson from '../generators/Michelson';

const SomeBlock = {
    type: BlockKind.some_literal,
    message0: 'Some %1',
    args0: [{ type: 'input_value', name: 'option_value', check: 'Literal' }],
    inputsInline: true,
    output: ['Literal', 'Option'],
    colour: 101,
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
        return SmartTSTypes.TOption(SmartML.toType(block, 'option_value'));
    },
    toValue: (block: Block): ILiteral => {
        return SmartTSLiterals.Some(SmartML.toValue(block, 'option_value'));
    },
});

Michelson.addBlock(BlockKind.some_literal, {
    toType: (block: Block) => {
        return MichelsonType.TOption(Michelson.toType(block, 'option_value'));
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Some(Michelson.toMichelson(block, 'option_value'));
    },
});
