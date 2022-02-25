import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Bls12_381_fr as M_Bls12_381_fr } from '@tezwell/michelson-sdk/literal';
import { TBls12_381_fr as M_TBls12_381_fr } from '@tezwell/michelson-sdk/type';
import { TBls12_381_fr as ST_TBls12_381_fr } from '@tezwell/smartts-sdk/type';
import { Bls12_381_fr as ST_Bls12_381_fr } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Bls12_381_frBlock = {
    type: BlockKind.bls12_381_fr_literal,
    message0: 'Bls12_381_fr %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: ['String', 'Number'],
        },
    ],
    output: ['Literal', 'Bls12_381_fr'],
    colour: 40,
};

Blockly.Blocks[BlockKind.bls12_381_fr_literal] = {
    init: function () {
        this.jsonInit(Bls12_381_frBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bls12_381_fr_literal, {
    toType: () => {
        return ST_TBls12_381_fr();
    },
    toValue: (block: Block) => {
        return ST_Bls12_381_fr(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.bls12_381_fr_literal, {
    toType: () => {
        return M_TBls12_381_fr();
    },
    toMichelson: (block: Block) => {
        return M_Bls12_381_fr(block.getFieldValue('value'));
    },
});
