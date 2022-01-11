import type { Block } from 'blockly';
import Blockly from 'blockly';

import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const SomeBlock = {
    type: BlockKind.none_literal,
    message0: 'None of type %1',
    args0: [{ type: 'input_value', name: 'inner_type', check: 'Type' }],
    inputsInline: true,
    output: ['Literal', 'Option'],
    colour: 101,
};

Blockly.Blocks[BlockKind.none_literal] = {
    init: function () {
        this.jsonInit(SomeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.none_literal, {
    toType: (block: Block) => {
        return SmartTSTypes.TOption(SmartML.toType(block, 'inner_type'));
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.None(SmartML.toType(block, 'inner_type'));
    },
});

Michelson.addBlock(BlockKind.none_literal, {
    toType: (block: Block) => {
        return MichelsonCore.TOption(Michelson.toType(block, 'inner_type'));
    },
    toMichelson: (block: Block) => {
        return MichelsonCore.None(Michelson.toType(block, 'inner_type'));
    },
});
