import Blockly from 'blockly';

import { TString } from '@tezwell/smartts-sdk/core/type';
import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const StringBlock = {
    type: BlockKind.string_type,
    message0: 'String',
    output: 'Type',
    colour: 144,
};

Blockly.Blocks[BlockKind.string_type] = {
    init: function () {
        this.jsonInit(StringBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_type, {
    toType: () => {
        return TString;
    },
});

Michelson.addBlock(BlockKind.string_type, {
    toType: () => {
        return MichelsonCore.Type.TString;
    },
});
