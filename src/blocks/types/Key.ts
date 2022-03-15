import Blockly from 'blockly';

import { TKey } from '@tezwell/smartts-sdk/type';
import { TKey as M_TKey } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.key_type,
    message0: 'Type | Key',
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.key_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.key_type, {
    toType: () => {
        return TKey();
    },
});

Michelson.addBlock(BlockKind.key_type, {
    toType: () => {
        return M_TKey();
    },
});
