import Blockly from 'blockly';

import { TBool } from '@tezwell/smartts-sdk/type';
import MichelsonTypes from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BooleanBlock = {
    type: BlockKind.boolean_type,
    message0: 'Type | Bool',
    output: 'Type',
    colour: 230,
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
        return TBool();
    },
});

Michelson.addBlock(BlockKind.boolean_type, {
    toType: () => {
        return MichelsonTypes.TBool();
    },
});
