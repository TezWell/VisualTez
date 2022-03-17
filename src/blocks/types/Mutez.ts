import Blockly from 'blockly';

import { TMutez } from '@tezwell/smartts-sdk/type';
import { TMutez as M_TMutez } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.mutez_type,
    message0: 'Type | Mutez',
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.mutez_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.mutez_type, {
    toType: () => {
        return TMutez();
    },
});

Michelson.addBlock(BlockKind.mutez_type, {
    toType: () => {
        return M_TMutez();
    },
});
