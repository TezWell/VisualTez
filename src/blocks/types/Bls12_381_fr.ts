import Blockly from 'blockly';

import { TBls12_381_fr } from '@tezwell/smartts-sdk/type';
import { TBls12_381_fr as M_TBls12_381_fr } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.bls12_381_fr_type,
    message0: 'Type: Bls12_381_fr',
    output: 'Type',
    colour: 299,
};

Blockly.Blocks[BlockKind.bls12_381_fr_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bls12_381_fr_type, {
    toType: () => {
        return TBls12_381_fr();
    },
});

Michelson.addBlock(BlockKind.bls12_381_fr_type, {
    toType: () => {
        return M_TBls12_381_fr();
    },
});
