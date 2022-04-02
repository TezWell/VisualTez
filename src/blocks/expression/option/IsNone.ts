import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { isSome } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const IsNoneBlock = {
    type: BlockKind.is_none,
    message0: 'Is None %1',
    args0: [{ type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] }],
    colour: 200,
    outputShape: 3,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.is_none] = {
    init: function () {
        this.jsonInit(IsNoneBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.is_none, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return isSome(value, buildErrorInfo(block));
    },
});
