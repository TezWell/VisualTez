import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Left as ST_Left, Right as ST_Right, Variant as ST_Variant } from '@tezwell/smartts-sdk/expression';
import { Left as M_Left, Right as M_Right } from '@tezwell/michelson-sdk/literal';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

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
                { type: 'input_value', name: 'value', check: ['Literal', 'Expression'] },
            ],
            colour: 40,
            output: 'Expression',
        });
    },
};

SmartML.addBlock(BlockKind.variant_value, {
    toValue: (block: Block) => {
        const variant: string = block.getFieldValue('variant');
        const value = SmartML.toValue(block, 'value');
        return ST_Variant(variant, value, buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.variant_value, {
    toMichelson: () => {
        throw new Error('Variant values must be used inside a contract.');
    },
});

Blockly.Blocks[BlockKind.left_literal_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.left_literal_block,
            message0: 'Left %1',
            args0: [{ type: 'input_value', name: 'VALUE', check: ['Expression', 'Literal'] }],
            colour: 40,
            output: 'Literal',
        });
    },
};
SmartML.addBlock(BlockKind.left_literal_block, {
    toValue: (block: Block) => {
        const value = SmartML.toValue(block, 'VALUE');
        return ST_Left(value, buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.left_literal_block, {
    toMichelson: (block: Block) => {
        const value = Michelson.toMichelson(block, 'VALUE');
        return M_Left(value);
    },
});

Blockly.Blocks[BlockKind.right_literal_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.right_literal_block,
            message0: 'Right %1',
            args0: [{ type: 'input_value', name: 'VALUE', check: ['Expression', 'Literal'] }],
            colour: 40,
            output: 'Literal',
        });
    },
};
SmartML.addBlock(BlockKind.right_literal_block, {
    toValue: (block: Block) => {
        const value = SmartML.toValue(block, 'VALUE');
        return ST_Right(value, buildErrorInfo(block));
    },
});
Michelson.addBlock(BlockKind.right_literal_block, {
    toMichelson: (block: Block) => {
        const value = Michelson.toMichelson(block, 'VALUE');
        return M_Right(value);
    },
});
