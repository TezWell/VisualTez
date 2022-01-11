import type { Block } from 'blockly';
import Blockly from 'blockly';

import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
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
    output: 'Boolean',
    colour: 40,
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
        return SmartTSTypes.TBool;
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Bool(block.getFieldValue('boolean_value') === 'True');
    },
});

Michelson.addBlock(BlockKind.boolean_literal, {
    toType: () => {
        return MichelsonCore.TBool;
    },
    toMichelson: (block: Block) => {
        return MichelsonCore.Bool(block.getFieldValue('boolean_value') === 'True');
    },
});
