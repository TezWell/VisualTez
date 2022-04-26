import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { GetMapValues } from '@tezwell/smartts-sdk';

import BlockKind from 'src/blocks/enums/BlockKind';
import SmartML from 'src/blocks/generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

const GetMapValuesBlock = {
    type: BlockKind.get_map_values,
    message0: 'Get map values %1',
    args0: [{ type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_map_values] = {
    init: function () {
        this.jsonInit(GetMapValuesBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_map_values, {
    toValue: (block: Block) => {
        const expression: IExpression<any> = SmartML.toValue(block, 'MAP');
        return GetMapValues(expression, buildErrorInfo(block));
    },
});
