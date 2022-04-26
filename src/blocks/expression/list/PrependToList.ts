import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { PrependToList } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const PrependToListBlock = {
    type: BlockKind.prepend_to_list,
    message0: 'Prepend element %1 to list %2',
    args0: [
        { type: 'input_value', name: 'ELEMENT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'LIST', check: ['Literal', 'Expression'] },
    ],
    tooltip: 'Create new list and prepend an element to it.',
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.prepend_to_list] = {
    init: function () {
        this.jsonInit(PrependToListBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.prepend_to_list, {
    toValue: (block: Block) => {
        const element = SmartML.toValue(block, 'ELEMENT');
        const list: IExpression<any> = SmartML.toValue(block, 'LIST');
        return PrependToList(list, element, buildErrorInfo(block));
    },
});
