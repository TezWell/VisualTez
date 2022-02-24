import Blockly from 'blockly';

import { None as M_None } from '@tezwell/michelson-sdk/literal';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const NoneBlock = {
    type: BlockKind.none_literal,
    message0: 'None',
    output: ['Literal', 'Option'],
    colour: 310,
};

Blockly.Blocks[BlockKind.none_literal] = {
    init: function () {
        this.jsonInit(NoneBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

Michelson.addBlock(BlockKind.none_literal, {
    toType: () => {
        throw new Error('Cannot infer option type from (None) value.');
    },
    toMichelson: () => {
        return M_None();
    },
});
