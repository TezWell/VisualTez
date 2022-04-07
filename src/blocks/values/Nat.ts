import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Nat as M_Nat } from '@tezwell/michelson-sdk/literal';
import { TNat as M_TNat } from '@tezwell/michelson-sdk/type';
import { TNat as ST_TNat } from '@tezwell/smartts-sdk/type';
import { Nat as ST_Nat } from '@tezwell/smartts-sdk/expression';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildBlockErrorString, buildErrorInfo } from '../utils/errorHandling';

const NatBlock = {
    type: BlockKind.nat_literal,
    message0: 'Nat %1',
    args0: [
        {
            type: 'field_number',
            name: 'nat_value',
            check: 'Number',
        },
    ],
    output: ['Literal', 'Nat'],
    colour: 40,
};

Blockly.Blocks[BlockKind.nat_literal] = {
    init: function () {
        this.jsonInit(NatBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.nat_literal, {
    toType: () => {
        return ST_TNat();
    },
    toValue: (block: Block) => {
        return ST_Nat(validate(block), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.nat_literal, {
    toType: () => {
        return M_TNat();
    },
    toMichelson: (block: Block) => {
        return M_Nat(validate(block));
    },
});

const validate = (block: Block) => {
    const number = Number(block.getFieldValue('nat_value'));
    if (number < 0) {
        throw new Error(`Cannot take negative values. ${buildBlockErrorString(block)}`);
    }
    return number;
};
