import type { Block } from 'blockly';
import Blockly from 'blockly';

import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

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
    output: ['Literal', 'Number'],
    colour: 10,
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
        return SmartTSTypes.TNat;
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Nat(block.getFieldValue('nat_value'));
    },
});
Michelson.addBlock(BlockKind.nat_literal, {
    toType: () => {
        return MichelsonType.TNat();
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Nat(block.getFieldValue('nat_value'));
    },
});
