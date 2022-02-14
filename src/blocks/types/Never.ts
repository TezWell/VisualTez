import Blockly from 'blockly';

import { TNever } from '@tezwell/smartts-sdk/type';
import { TNever as M_TNever } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.never_type,
    message0: 'Type: Never',
    output: 'Type',
    colour: 379,
};

Blockly.Blocks[BlockKind.never_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.never_type, {
    toType: () => {
        return TNever();
    },
});

Michelson.addBlock(BlockKind.never_type, {
    toType: () => {
        return M_TNever();
    },
});
