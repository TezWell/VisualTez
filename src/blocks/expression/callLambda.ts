import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { CallLambda } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const CallLambdaBlock = {
    type: BlockKind.call_lambda,
    message0: 'Call lambda %1',
    args0: [{ type: 'input_value', name: 'LAMBDA', check: ['Literal', 'Expression'] }],
    message1: 'with argument %1',
    args1: [{ type: 'input_value', name: 'ARGUMENT', check: ['Literal', 'Expression'] }],
    colour: 200,
    outputShape: 3,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.call_lambda] = {
    init: function () {
        this.jsonInit(CallLambdaBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.call_lambda, {
    toValue: (block: Block) => {
        const lambda: IExpression<any> = SmartML.toValue(block, 'LAMBDA');
        const argument = SmartML.toValue(block, 'ARGUMENT');
        return CallLambda(lambda, argument, buildErrorInfo(block));
    },
});
