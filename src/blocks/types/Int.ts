import Blockly from 'blockly';

import { TInt } from '@tezwell/smartts-sdk/core/type';
import MichelsonTypes from '@tezwell/michelson-sdk/core/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const IntTypeBlock = {
    type: BlockKind.int_type,
    message0: 'Type: Int',
    output: 'Type',
    colour: 320,
};

Blockly.Blocks[BlockKind.int_type] = {
    init: function () {
        this.jsonInit(IntTypeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.int_type, {
    toType: () => {
        return TInt;
    },
});

Michelson.addBlock(BlockKind.int_type, {
    toType: () => {
        return MichelsonTypes.TInt;
    },
});