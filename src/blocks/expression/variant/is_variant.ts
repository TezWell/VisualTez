import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { IsVariant } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const IsVariantBlock = {
    type: BlockKind.is_variant_expression,
    message0: 'Is value %1 of variant %2',
    args0: [
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        {
            type: 'field_input',
            name: 'VARIANT',
            check: 'String',
        },
    ],
    tooltip: 'Checks if a value matches a given variant.\n-\nTVariant(...) -> string -> TBool()',
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.is_variant_expression] = {
    init: function () {
        this.jsonInit(IsVariantBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.is_variant_expression, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        const variant: string = block.getFieldValue('VARIANT');
        return IsVariant(value, variant, buildErrorInfo(block));
    },
});
