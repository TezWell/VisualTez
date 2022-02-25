import type { Block } from 'blockly';
import Blockly from 'blockly';

import { TRecord as ST_TRecord, TVariant as ST_TVariant } from '@tezwell/smartts-sdk/type';
import { TRecord as M_TRecord, TVariant as M_TVariant } from '@tezwell/michelson-sdk/type';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const toFieldBlock = (block: Block): [string, Block] => {
    const key: string = block.getFieldValue('key');
    return [key, block];
};

// Record

Blockly.Blocks[BlockKind.record_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_type,
            message0: 'Type: Record %1',
            args0: [{ type: 'input_statement', name: 'fields', check: 'VariantRecordField' }],
            output: ['Type'],
            outputShape: 3,
            colour: 240,
        });
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.record_type, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return ST_TRecord(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'value') }), {}));
    },
});

Michelson.addBlock(BlockKind.record_type, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return M_TRecord(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'value') }), {}));
    },
});

// Variant

Blockly.Blocks[BlockKind.variant_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.variant_type,
            message0: 'Type: Variant %1',
            args0: [{ type: 'input_statement', name: 'fields', check: 'VariantRecordField' }],
            output: ['Type'],
            outputShape: 3,
            colour: 240,
        });
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.variant_type, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('fields');
        if (!targetBlock) {
            throw new Error('The variant is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return ST_TVariant(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'type') }), {}));
    },
});

Michelson.addBlock(BlockKind.variant_type, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('fields');
        if (!targetBlock) {
            throw new Error('The variant is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return M_TVariant(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'type') }), {}));
    },
});

// Field

Blockly.Blocks[BlockKind.record_variant_field_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_variant_field_type,
            message0: 'Field %1 Value %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'key',
                    text: '',
                    check: 'String',
                },
                { type: 'input_value', name: 'type', check: 'Type' },
            ],
            colour: 250,
        });
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};

SmartML.addBlock(BlockKind.record_variant_field_type, {
    toFieldBlock: (block: Block) => {
        const key: string = block.getFieldValue('key');
        return [key, block];
    },
});
