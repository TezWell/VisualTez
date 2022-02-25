import Blockly from 'blockly';

import { TChain_id } from '@tezwell/smartts-sdk/type';
import { TChain_id as M_TChain_id } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.chain_id_type,
    message0: 'Type: Chain_id',
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.chain_id_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.chain_id_type, {
    toType: () => {
        return TChain_id();
    },
});

Michelson.addBlock(BlockKind.chain_id_type, {
    toType: () => {
        return M_TChain_id();
    },
});
