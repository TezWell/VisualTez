import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Variant as ST_Variant } from '@tezwell/smartts-sdk/expression';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

Blockly.Blocks[BlockKind.variant_value] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.variant_value,
            message0: 'Variant %1 of value %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'variant',
                    text: '',
                    check: 'String',
                },
                { type: 'input_value', name: 'value', check: 'Literal' },
            ],
            colour: 70,
        });
    },
};

SmartML.addBlock(BlockKind.variant_value, {
    toValue: (block: Block) => {
        const variant: string = block.getFieldValue('variant');
        const value = SmartML.toValue(block, 'value');
        return ST_Variant(variant, value);
    },
});
Michelson.addBlock(BlockKind.variant_value, {
    toMichelson: () => {
        throw new Error('Variant values must be used inside a contract.');
    },
});
