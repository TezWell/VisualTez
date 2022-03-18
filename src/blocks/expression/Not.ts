import { Not } from '@tezwell/smartts-sdk';
import Blockly, { Block } from 'blockly';
import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';

const NotBlock = {
    type: BlockKind.not,
    message0: 'Not %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 123,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.not] = {
    init: function () {
        this.jsonInit(NotBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.not, {
    toValue: (block: Block) => {
        const ofExpression = SmartML.toValue(block, 'VALUE');
        return Not(ofExpression);
    },
});
