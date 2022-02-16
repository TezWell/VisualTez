import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Chain_id as M_Chain_id } from '@tezwell/michelson-sdk/literal';
import { TChain_id as M_TChain_id } from '@tezwell/michelson-sdk/type';
import { TChain_id as ST_TChain_id } from '@tezwell/smartts-sdk/type';
import { Chain_id as ST_Chain_id } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Chain_idBlock = {
    type: BlockKind.chain_id_literal,
    message0: 'Chain_id %1',
    args0: [
        {
            type: 'field_input',
            name: 'value',
            check: 'String',
        },
    ],
    output: ['Literal', 'Chain_id'],
    colour: 70,
};

Blockly.Blocks[BlockKind.chain_id_literal] = {
    init: function () {
        this.jsonInit(Chain_idBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.chain_id_literal, {
    toType: () => {
        return ST_TChain_id();
    },
    toValue: (block: Block) => {
        return ST_Chain_id(block.getFieldValue('value'));
    },
});
Michelson.addBlock(BlockKind.chain_id_literal, {
    toType: () => {
        return M_TChain_id();
    },
    toMichelson: (block: Block) => {
        return M_Chain_id(block.getFieldValue('value'));
    },
});
