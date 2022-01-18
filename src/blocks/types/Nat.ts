import Blockly from 'blockly';

import { TNat } from '@tezwell/smartts-sdk/core/type';
import MichelsonTypes from '@tezwell/michelson-sdk/core/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const NatTypeBlock = {
    type: BlockKind.nat_type,
    message0: 'Type: Nat',
    output: 'Type',
    colour: 10,
};

Blockly.Blocks[BlockKind.nat_type] = {
    init: function () {
        this.jsonInit(NatTypeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.nat_type, {
    toType: () => {
        return TNat;
    },
});

Michelson.addBlock(BlockKind.nat_type, {
    toType: () => {
        return MichelsonTypes.TNat;
    },
});
