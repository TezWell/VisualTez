import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Mutez as M_Mutez } from '@tezwell/michelson-sdk/literal';
import { TMutez as M_TMutez } from '@tezwell/michelson-sdk/type';
import { TMutez as ST_TMutez } from '@tezwell/smartts-sdk/type';
import { Mutez as ST_Mutez } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildBlockErrorString, buildErrorInfo } from '../utils/errorHandling';

const MutezBlock = {
    type: BlockKind.mutez_literal,
    message0: 'Mutez %1',
    args0: [
        {
            type: 'field_number',
            name: 'value',
            check: 'Number',
        },
    ],
    output: ['Literal', 'Mutez'],
    colour: 40,
};

Blockly.Blocks[BlockKind.mutez_literal] = {
    init: function () {
        this.jsonInit(MutezBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.mutez_literal, {
    toType: () => {
        return ST_TMutez();
    },
    toValue: (block: Block) => {
        return ST_Mutez(validate(block), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.mutez_literal, {
    toType: () => {
        return M_TMutez();
    },
    toMichelson: (block: Block) => {
        return M_Mutez(validate(block));
    },
});

const validate = (block: Block) => {
    const number = Number(block.getFieldValue('value'));
    if (number < 0) {
        throw new Error(`Cannot take negative values. ${buildBlockErrorString(block)}`);
    }
    return number;
};
