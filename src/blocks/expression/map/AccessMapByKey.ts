import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { AccessMapByKey } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const AccessMapByKeyBlock = {
    type: BlockKind.get_map_value,
    message0: 'Access map %1 by key %2',
    args0: [
        { type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'KEY', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    tooltip: 'Access the value of a map by its key.',
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_map_value] = {
    init: function () {
        this.jsonInit(AccessMapByKeyBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_map_value, {
    toValue: (block: Block) => {
        const KeyExpression = SmartML.toValue(block, 'KEY');
        const mapExpression = SmartML.toValue(block, 'MAP');
        return AccessMapByKey(mapExpression, KeyExpression, undefined, undefined, buildErrorInfo(block));
    },
});
