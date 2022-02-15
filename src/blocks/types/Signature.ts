import Blockly from 'blockly';

import { TSignature } from '@tezwell/smartts-sdk/type';
import { TSignature as M_TSignature } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.signature_type,
    message0: 'Type: Signature',
    output: 'Type',
    colour: 349,
};

Blockly.Blocks[BlockKind.signature_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.signature_type, {
    toType: () => {
        return TSignature();
    },
});

Michelson.addBlock(BlockKind.signature_type, {
    toType: () => {
        return M_TSignature();
    },
});
