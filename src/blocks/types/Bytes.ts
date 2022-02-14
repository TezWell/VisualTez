import Blockly from 'blockly';

import { TBytes } from '@tezwell/smartts-sdk/type';
import { TBytes as M_TBytes } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.bytes_type,
    message0: 'Type: Bytes',
    output: 'Type',
    colour: 269,
};

Blockly.Blocks[BlockKind.bytes_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.bytes_type, {
    toType: () => {
        return TBytes();
    },
});

Michelson.addBlock(BlockKind.bytes_type, {
    toType: () => {
        return M_TBytes();
    },
});
