import Blockly, { Block } from 'blockly';
import { AccessMapByKey } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';

const AccessMapByKeyBlock = {
    type: BlockKind.get_map_value,
    message0: 'Access map %1 by key %2',
    args0: [
        { type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'KEY', check: ['Literal', 'Expression'] },
    ],
    colour: 123,
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
        return AccessMapByKey(mapExpression, KeyExpression);
    },
});
