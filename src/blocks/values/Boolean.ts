import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Bool as M_Bool } from '@tezwell/michelson-sdk/literal';
import { TBool as M_TBool } from '@tezwell/michelson-sdk/type';
import { TBool as ST_TBool } from '@tezwell/smartts-sdk/type';
import { Bool as ST_Bool } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

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
        return ST_TBool();
    },
    toValue: (block: Block) => {
        return ST_Bool(block.getFieldValue('boolean_value') === 'True', buildErrorInfo(block));
    },
});

Michelson.addBlock(BlockKind.boolean_literal, {
    toType: () => {
        return M_TBool();
    },
    toMichelson: (block: Block) => {
        return M_Bool(block.getFieldValue('boolean_value') === 'True');
    },
});
