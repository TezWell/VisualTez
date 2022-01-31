import type { Block } from 'blockly';
import Blockly from 'blockly';

import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const IntBlock = {
    type: BlockKind.int_literal,
    message0: 'Int %1',
    args0: [
        {
            type: 'field_number',
            name: 'int_value',
            check: 'Number',
        },
    ],
    output: ['Literal', 'Number'],
    colour: 320,
};
Blockly.Blocks[BlockKind.int_literal] = {
    init: function () {
        this.jsonInit(IntBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.int_literal, {
    toType: () => {
        return SmartTSTypes.TInt;
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Int(Number(block.getFieldValue('int_value')));
    },
});
Michelson.addBlock(BlockKind.int_literal, {
    toType: () => {
        return MichelsonType.TInt();
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Int(Number(block.getFieldValue('int_value')));
    },
});
