import Blockly from 'blockly';

import { TString } from '@tezwell/smartts-sdk/type';
import { TString as M_TString } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const StringBlock = {
    type: BlockKind.string_type,
    message0: 'Type: String',
    output: 'Type',
    colour: 230,
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
        return TString();
    },
});

Michelson.addBlock(BlockKind.string_type, {
    toType: () => {
        return M_TString();
    },
});
