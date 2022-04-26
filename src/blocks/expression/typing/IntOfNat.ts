import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { CastToInt } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

const IntOfNatBlock = {
    type: BlockKind.int_of_nat,
    message0: 'Cast nat to int %1',
    args0: [{ type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.int_of_nat] = {
    init: function () {
        this.jsonInit(IntOfNatBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.int_of_nat, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return CastToInt(value, buildErrorInfo(block));
    },
});
