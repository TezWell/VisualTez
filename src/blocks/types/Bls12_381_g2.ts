import Blockly from 'blockly';

import { TBls12_381_g2 } from '@tezwell/smartts-sdk/type';
import { TBls12_381_g2 as M_TBls12_381_g2 } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.bls12_381_g2_type,
    message0: 'Type | Bls12_381_g2',
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.bls12_381_g2_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bls12_381_g2_type, {
    toType: () => {
        return TBls12_381_g2();
    },
});

Michelson.addBlock(BlockKind.bls12_381_g2_type, {
    toType: () => {
        return M_TBls12_381_g2();
    },
});
