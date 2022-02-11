import type { Block } from 'blockly';
import Blockly from 'blockly';

import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartTSTypes from '@tezwell/smartts-sdk/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BooleanBlock = {
    type: BlockKind.boolean_literal,
    message0: 'Boolean %1',
    args0: [
        {
            type: 'field_dropdown',
            name: 'boolean_value',
            options: [
                ['True', 'True'],
                ['False', 'False'],
            ],
            check: 'Boolean',
        },
    ],
    output: ['Literal', 'Boolean'],
    colour: 209,
};

Blockly.Blocks[BlockKind.boolean_literal] = {
    init: function () {
        this.jsonInit(BooleanBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.boolean_literal, {
    toType: () => {
        return SmartTSTypes.TBool();
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Bool(block.getFieldValue('boolean_value') === 'True');
    },
});

Michelson.addBlock(BlockKind.boolean_literal, {
    toType: () => {
        return MichelsonType.TBool();
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Bool(block.getFieldValue('boolean_value') === 'True');
    },
});
