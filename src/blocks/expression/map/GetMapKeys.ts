import Blockly, { Block } from 'blockly';
import { GetMapKeys } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

const GetMapKeysBlock = {
    type: BlockKind.get_map_keys,
    message0: 'Get map keys %1',
    args0: [{ type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] }],
    colour: 123,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_map_keys] = {
    init: function () {
        this.jsonInit(GetMapKeysBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_map_keys, {
    toValue: (block: Block) => {
        const expression: IExpression<any> = SmartML.toValue(block, 'MAP');
        return GetMapKeys(expression, buildErrorInfo(block));
    },
});
