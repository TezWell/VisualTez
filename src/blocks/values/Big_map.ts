import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Big_map as M_Big_map } from '@tezwell/michelson-sdk/literal';
import { TBig_map as M_TBig_map } from '@tezwell/michelson-sdk/type';
import { TBig_map as ST_TBig_map, TUnknown } from '@tezwell/smartts-sdk/type';
import { Big_map as ST_Big_map } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Big_mapBlock = {
    type: BlockKind.big_map_literal,
    message0: 'Big_map %1',
    args0: [{ type: 'input_statement', name: 'entries', check: 'MapEntry' }],
    output: ['Literal', 'Big_map'],
    outputShape: 3,
    colour: 160,
};

Blockly.Blocks[BlockKind.big_map_literal] = {
    init: function () {
        this.jsonInit(Big_mapBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.big_map_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            return ST_TBig_map(TUnknown(), TUnknown());
        }

        return ST_TBig_map(SmartML.toType(targetBlock, 'key'), SmartML.toType(targetBlock, 'value'));
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            return ST_Big_map([]);
        }

        const entries = [];
        do {
            entries.push([SmartML.toValue(targetBlock, 'key'), SmartML.toValue(targetBlock, 'value')]);
        } while ((targetBlock = targetBlock.getNextBlock()));

        return ST_Big_map(entries);
    },
});

Michelson.addBlock(BlockKind.big_map_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The (Big_map) is empty.');
        }

        return M_TBig_map(Michelson.toType(targetBlock, 'key'), Michelson.toType(targetBlock, 'value'));
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            return M_Big_map([]);
        }

        const entries = [];
        do {
            entries.push([Michelson.toMichelson(targetBlock, 'key'), Michelson.toMichelson(targetBlock, 'value')]);
        } while ((targetBlock = targetBlock.getNextBlock()));

        return M_Big_map(entries);
    },
});
