import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { RemoveElementFromSet } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const AddElementToSetBlock = {
    type: BlockKind.add_element_to_set,
    message0: 'Add element %1 to Set %2',
    args0: [
        { type: 'input_value', name: 'ELEMENT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'SET', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    outputShape: 3,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.add_element_to_set] = {
    init: function () {
        this.jsonInit(AddElementToSetBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.add_element_to_set, {
    toStatement: (block: Block) => {
        const element = SmartML.toValue(block, 'ELEMENT');
        const set: IExpression<any> = SmartML.toValue(block, 'SET');
        return RemoveElementFromSet(set, element, buildErrorInfo(block));
    },
});
