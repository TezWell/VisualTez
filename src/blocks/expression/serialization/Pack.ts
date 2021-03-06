import { Pack } from '@tezwell/smartts-sdk';
import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const PackBlock = {
    type: BlockKind.pack,
    message0: 'Pack %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Literal', 'Expression'],
        },
    ],
    tooltip:
        'Serializes any value of packable type to its optimized binary representation.\n-\nany packable value => TBytes()',
    colour: 200,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.pack] = {
    init: function () {
        this.jsonInit(PackBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.pack, {
    toValue: (block: Block) => {
        return Pack(SmartML.toValue(block, 'VALUE'), buildErrorInfo(block));
    },
});
