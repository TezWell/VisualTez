import type { Block } from 'blockly';
import Blockly from 'blockly';

import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';
import SmartTSTypes from '@tezwell/smartts-sdk/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BytesBlock = {
    type: BlockKind.bytes_literal,
    message0: 'Bytes %1',
    args0: [
        {
            type: 'field_input',
            name: 'bytes',
            text: '',
            check: 'String',
        },
    ],
    output: ['Literal', 'Bytes'],
    colour: 190,
};

Blockly.Blocks[BlockKind.bytes_literal] = {
    init: function () {
        this.jsonInit(BytesBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_literal, {
    toType: () => {
        return SmartTSTypes.TString();
    },
    toValue: (block: Block) => {
        return SmartTSLiterals.Bytes(block.getFieldValue('bytes'));
    },
});
Michelson.addBlock(BlockKind.string_literal, {
    toType: () => {
        return MichelsonType.TBytes();
    },
    toMichelson: (block: Block) => {
        return MichelsonLiteral.Bytes(block.getFieldValue('bytes'));
    },
});
