import Blockly from 'blockly';

import { TBool } from '@tezwell/smartts-sdk/core/type';
import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BooleanBlock = {
    type: BlockKind.boolean_type,
    message0: 'Type: Boolean',
    output: 'Type',
    colour: 50,
};

Blockly.Blocks[BlockKind.boolean_type] = {
    init: function () {
        this.jsonInit(BooleanBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.boolean_type, {
    toType: () => {
        return TBool;
    },
});

Michelson.addBlock(BlockKind.boolean_type, {
    toType: () => {
        return MichelsonCore.Type.TBool;
    },
});
