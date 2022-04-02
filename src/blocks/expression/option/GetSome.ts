import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { GetSome } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const GetSomeBlock = {
    type: BlockKind.get_some,
    message0: 'Get some %1',
    args0: [{ type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] }],
    colour: 200,
    outputShape: 3,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_some] = {
    init: function () {
        this.jsonInit(GetSomeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_some, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return GetSome(value, undefined, buildErrorInfo(block));
    },
});
