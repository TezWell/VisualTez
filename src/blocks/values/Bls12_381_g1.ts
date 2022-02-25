import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Bls12_381_g1 as M_Bls12_381_g1 } from '@tezwell/michelson-sdk/literal';
import { TBls12_381_g1 as M_TBls12_381_g1 } from '@tezwell/michelson-sdk/type';
import { TBls12_381_g1 as ST_TBls12_381_g1 } from '@tezwell/smartts-sdk/type';
import { Bls12_381_g1 as ST_Bls12_381_g1 } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Bls12_381_g1Block = {
    type: BlockKind.bls12_381_g1_literal,
    message0: 'Bls12_381_g1 %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Bls12_381_g1'],
    colour: 40,
};

Blockly.Blocks[BlockKind.bls12_381_g1_literal] = {
    init: function () {
        this.jsonInit(Bls12_381_g1Block);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bls12_381_g1_literal, {
    toType: () => {
        return ST_TBls12_381_g1();
    },
    toValue: (block: Block) => {
        return ST_Bls12_381_g1(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.bls12_381_g1_literal, {
    toType: () => {
        return M_TBls12_381_g1();
    },
    toMichelson: (block: Block) => {
        return M_Bls12_381_g1(block.getFieldValue('value'));
    },
});
