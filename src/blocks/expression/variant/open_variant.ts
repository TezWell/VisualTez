import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { OpenVariant, Unit } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const OpenVariantBlock = {
    type: BlockKind.open_variant_expression,
    message0: 'Open variant %1 of value %2 or fail with %3',
    args0: [
        {
            type: 'field_input',
            name: 'VARIANT',
            check: 'String',
        },
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'ERROR_MESSAGE', check: ['Literal', 'Expression'] },
    ],
    tooltip: 'Extracts the inner value of a variant value.',
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.open_variant_expression] = {
    init: function () {
        this.jsonInit(OpenVariantBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.open_variant_expression, {
    toValue: (block: Block) => {
        const variant: string = block.getFieldValue('VARIANT');
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        const errorMsg: IExpression<any> = SmartML.toValue(block, 'ERROR_MESSAGE', Unit());
        return OpenVariant(value, variant, errorMsg, buildErrorInfo(block));
    },
});
