import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { MapContainsKey } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

/**
 * Checks if a given key exists in map or big_map.
 */
const MapContainsKeyBlock = {
    type: BlockKind.map_contains_key,
    message0: 'Map %1 contains key %2',
    args0: [
        { type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'KEY', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    tooltip: 'Verifies if a map contains a given key.\n-\n... => TBool()',
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.map_contains_key] = {
    init: function () {
        this.jsonInit(MapContainsKeyBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.map_contains_key, {
    toValue: (block: Block) => {
        const KeyExpression = SmartML.toValue(block, 'KEY');
        const mapExpression = SmartML.toValue(block, 'MAP');
        return MapContainsKey(mapExpression, KeyExpression, buildErrorInfo(block));
    },
});
