import type { Block } from 'blockly';
import Blockly from 'blockly';

import SmartTSTypes from '@tezwell/smartts-sdk/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/expression';
import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
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
        return SmartTSLiterals.None();
    },
});

Michelson.addBlock(BlockKind.none_literal, {
    toType: (block: Block) => {
        return MichelsonType.TOption(Michelson.toType(block, 'inner_type'));
    },
    toMichelson: () => {
        return MichelsonLiteral.None();
    },
});
