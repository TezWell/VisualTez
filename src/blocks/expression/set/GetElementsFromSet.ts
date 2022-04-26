import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { GetElementsFromSet } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const GetElementsFromSetBlock = {
    type: BlockKind.get_elements_from_set,
    message0: 'Get elements from Set %1',
    args0: [{ type: 'input_value', name: 'SET', check: ['Literal', 'Expression'] }],
    colour: 200,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_elements_from_set] = {
    init: function () {
        this.jsonInit(GetElementsFromSetBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_elements_from_set, {
    toStatement: (block: Block) => {
        const set: IExpression<any> = SmartML.toValue(block, 'SET');
        return GetElementsFromSet(set, buildErrorInfo(block));
    },
});
