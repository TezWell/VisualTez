import Blockly, { Block } from 'blockly';
import { MapContainsKey, SetContainsElement } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

/**
 * Checks if a given element exists in a Set.
 */
const SetContainsElementBlock = {
    type: BlockKind.set_contains_element_expression,
    message0: 'Set %1 contains element %2',
    args0: [
        { type: 'input_value', name: 'SET', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'ELEMENT', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.set_contains_element_expression] = {
    init: function () {
        this.jsonInit(SetContainsElementBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.set_contains_element_expression, {
    toValue: (block: Block) => {
        const setExpression = SmartML.toValue(block, 'SET');
        const elementExpression = SmartML.toValue(block, 'ELEMENT');
        return SetContainsElement(setExpression, elementExpression, buildErrorInfo(block));
    },
});
