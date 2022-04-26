import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Bls12_381_g2 as M_Bls12_381_g2 } from '@tezwell/michelson-sdk/literal';
import { TBls12_381_g2 as M_TBls12_381_g2 } from '@tezwell/michelson-sdk/type';
import { TBls12_381_g2 as ST_TBls12_381_g2 } from '@tezwell/smartts-sdk/type';
import { Bls12_381_g2 as ST_Bls12_381_g2 } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const Bls12_381_g2Block = {
    type: BlockKind.bls12_381_g2_literal,
    message0: 'Bls12_381_g2 %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Bls12_381_g2'],
    colour: 40,
};

Blockly.Blocks[BlockKind.bls12_381_g2_literal] = {
    init: function () {
        this.jsonInit(Bls12_381_g2Block);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bls12_381_g2_literal, {
    toType: () => {
        return ST_TBls12_381_g2();
    },
    toValue: (block: Block) => {
        return ST_Bls12_381_g2(block.getFieldValue('value'), buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.bls12_381_g2_literal, {
    toType: () => {
        return M_TBls12_381_g2();
    },
    toMichelson: (block: Block) => {
        return M_Bls12_381_g2(block.getFieldValue('value'));
    },
});
