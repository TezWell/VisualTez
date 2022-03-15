import Blockly from 'blockly';

import { TTimestamp } from '@tezwell/smartts-sdk/type';
import { TTimestamp as M_TTypestamp } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.timestamp_type,
    message0: 'Type | Timestamp',
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.timestamp_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.timestamp_type, {
    toType: () => {
        return TTimestamp();
    },
});

Michelson.addBlock(BlockKind.timestamp_type, {
    toType: () => {
        return M_TTypestamp();
    },
});
