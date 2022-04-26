import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { FirstElement, SecondElement } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const FirstPairElementBlock = {
    type: BlockKind.get_first_pair_element,
    message0: 'First element of pair %1',
    args0: [{ type: 'input_value', name: 'FROM', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_first_pair_element] = {
    init: function () {
        this.jsonInit(FirstPairElementBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_first_pair_element, {
    toValue: (block: Block) => {
        return FirstElement(SmartML.toValue(block, 'FROM'), buildErrorInfo(block));
    },
});

const SecondPairElementBlock = {
    type: BlockKind.get_second_pair_element,
    message0: 'Second element of pair %1',
    args0: [{ type: 'input_value', name: 'FROM', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_second_pair_element] = {
    init: function () {
        this.jsonInit(SecondPairElementBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_second_pair_element, {
    toValue: (block: Block) => {
        return SecondElement(SmartML.toValue(block, 'FROM'), buildErrorInfo(block));
    },
});
