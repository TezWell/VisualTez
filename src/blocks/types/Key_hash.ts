import Blockly from 'blockly';

import { TKey_hash } from '@tezwell/smartts-sdk/type';
import { TKey_hash as M_TKey_hash } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.key_hash_type,
    message0: 'Type: Key_hash',
    output: 'Type',
    colour: 319,
};

Blockly.Blocks[BlockKind.key_hash_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.key_hash_type, {
    toType: () => {
        return TKey_hash();
    },
});

Michelson.addBlock(BlockKind.key_hash_type, {
    toType: () => {
        return M_TKey_hash();
    },
});
