import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Signature as M_Signature } from '@tezwell/michelson-sdk/literal';
import { TSignature as M_TSignature } from '@tezwell/michelson-sdk/type';
import { TSignature as ST_TSignature } from '@tezwell/smartts-sdk/type';
import { Signature as ST_Signature } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const SignatureBlock = {
    type: BlockKind.signature_literal,
    message0: 'Signature %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Signature'],
    colour: 40,
};

Blockly.Blocks[BlockKind.signature_literal] = {
    init: function () {
        this.jsonInit(SignatureBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.signature_literal, {
    toType: () => {
        return ST_TSignature();
    },
    toValue: (block: Block) => {
        return ST_Signature(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.signature_literal, {
    toType: () => {
        return M_TSignature();
    },
    toMichelson: (block: Block) => {
        return M_Signature(block.getFieldValue('value'));
    },
});
