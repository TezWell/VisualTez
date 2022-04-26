import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { CallView } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const CallViewBlock = {
    type: BlockKind.call_view,
    message0: 'Call view %1 from %2',
    args0: [
        {
            type: 'field_input',
            name: 'NAME',
            check: 'String',
        },
        { type: 'input_value', name: 'ADDRESS', check: ['Literal', 'Expression'] },
    ],
    message1: 'with argument %1',
    args1: [{ type: 'input_value', name: 'ARGUMENT', check: ['Literal', 'Expression'] }],
    message2: 'expects output type %1',
    args2: [{ type: 'input_value', name: 'OUT_TYPE', check: ['Type'] }],
    colour: 200,
    outputShape: 3,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.call_view] = {
    init: function () {
        this.jsonInit(CallViewBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.call_view, {
    toValue: (block: Block) => {
        const name: string = block.getFieldValue('NAME');
        const address: IExpression<any> = SmartML.toValue(block, 'ADDRESS');
        const argument = SmartML.toValue(block, 'ARGUMENT');
        const outType = SmartML.toType(block, 'OUT_TYPE');
        return CallView(name, address, argument, outType, buildErrorInfo(block));
    },
});
