import { Block } from 'blockly';
import Blockly from 'blockly';
import { While } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const WhileBlock = {
    type: BlockKind.while_block,
    message0: 'While %1',
    args0: [
        {
            type: 'input_value',
            name: 'CONDITION',
            check: 'Boolean',
        },
    ],
    message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
    args1: [
        {
            type: 'input_statement',
            name: 'DO',
            check: 'Statement',
        },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 180,
};

Blockly.Blocks[BlockKind.while_block] = {
    init: function () {
        this.jsonInit(WhileBlock);
    },
};

SmartML.addBlock(BlockKind.while_block, {
    toStatement: (block: Block) => {
        const condition = SmartML.toValue(block, 'CONDITION');

        const instructions = SmartML.toStatements(block, 'DO', true);

        return While(condition, instructions);
    },
});
