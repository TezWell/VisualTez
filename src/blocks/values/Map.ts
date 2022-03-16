import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Map as M_Map } from '@tezwell/michelson-sdk/literal';
import { TMap as M_TMap } from '@tezwell/michelson-sdk/type';
import { TMap as ST_TMap, TUnknown } from '@tezwell/smartts-sdk/type';
import { Map as ST_Map } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const MapBlock = {
    type: BlockKind.map_literal,
    message0: 'Map %1',
    args0: [{ type: 'input_statement', name: 'entries', check: 'MapEntry' }],
    output: ['Literal', 'Map'],
    outputShape: 3,
    colour: 160,
};

Blockly.Blocks[BlockKind.map_literal] = {
    init: function () {
        this.jsonInit(MapBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.map_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            return ST_TMap(TUnknown(), TUnknown());
        }

        return ST_TMap(SmartML.toType(targetBlock, 'key'), SmartML.toType(targetBlock, 'value'));
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        const line = buildErrorInfo(block);
        if (!targetBlock) {
            return ST_Map([], undefined, undefined, line);
        }

        const entries = [];
        do {
            entries.push([SmartML.toValue(targetBlock, 'key'), SmartML.toValue(targetBlock, 'value')]);
        } while ((targetBlock = targetBlock.getNextBlock()));

        return ST_Map(entries, undefined, undefined, line);
    },
});

Michelson.addBlock(BlockKind.map_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The (map) is empty.');
        }

        return M_TMap(Michelson.toType(targetBlock, 'key'), Michelson.toType(targetBlock, 'value'));
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            return M_Map([]);
        }

        const entries = [];
        do {
            entries.push([Michelson.toMichelson(targetBlock, 'key'), Michelson.toMichelson(targetBlock, 'value')]);
        } while ((targetBlock = targetBlock.getNextBlock()));

        return M_Map(entries);
    },
});

Blockly.Blocks[BlockKind.map_entry] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.map_entry,
            message0: 'Key %1 Value %2',
            args0: [
                { type: 'input_value', name: 'key', check: 'Literal' },
                { type: 'input_value', name: 'value', check: 'Literal' },
            ],
            inputsInline: true,
            colour: 170,
        });
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};
