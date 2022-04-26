import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { PrependToList, SetValue } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const AddToListBlock = {
    type: BlockKind.add_to_list,
    message0: 'Add element %1 to list %2',
    args0: [
        { type: 'input_value', name: 'ELEMENT', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'LIST', check: ['Literal', 'Expression'] },
    ],
    tooltip: 'Add an element to a list.',
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[BlockKind.add_to_list] = {
    init: function () {
        this.jsonInit(AddToListBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.add_to_list, {
    toStatement: (block: Block) => {
        const element = SmartML.toValue(block, 'ELEMENT');
        const list: IExpression<any> = SmartML.toValue(block, 'LIST');
        return SetValue(list, PrependToList(list, element), buildErrorInfo(block));
    },
});
