import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { TRecord as ST_TRecord, TVariant as ST_TVariant } from '@tezwell/smartts-sdk/type';
import { TRecord as M_TRecord, TVariant as M_TVariant } from '@tezwell/michelson-sdk/type';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import Logger from 'src/utils/logger';

const toFieldBlock = (block: Block): [string, Block] => {
    const key: string = block.getFieldValue('key');
    return [key, block];
};

// Record

Blockly.Blocks[BlockKind.record_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_type,
            message0: 'Type | Record %1',
            args0: [{ type: 'input_statement', name: 'fields', check: ['RecordVariantFieldType'] }],
            output: ['Type'],
            outputShape: 3,
            colour: 230,
        });
        const layoutField = new Blockly.FieldTextInput('');
        layoutField.setTooltip('Default: Right combs\n---\nExample: ["prop1", ["prop2", "props3"]]');
        this.appendDummyInput().appendField('Layout').appendField(layoutField, 'LAYOUT').setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(false);
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

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        if (layout) {
            try {
                layoutArray = JSON.parse(layout.replace(/'/g, '"'));
            } catch {
                Logger.debug('Invalid layout', layout);
            }
        }

        return ST_TRecord(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'type') }), {}),
            layoutArray,
        );
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

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        if (layout) {
            try {
                layoutArray = JSON.parse(layout.replace(/'/g, '"'));
            } catch {
                Logger.debug('Invalid layout', layout);
            }
        }

        return M_TRecord(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'type') }), {}),
            layoutArray,
        );
    },
});

// Variant

Blockly.Blocks[BlockKind.variant_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.variant_type,
            message0: 'Type | Variant %1',
            args0: [{ type: 'input_statement', name: 'fields', check: ['RecordVariantFieldType'] }],
            output: ['Type'],
            outputShape: 3,
            colour: 230,
        });
        const layoutField = new Blockly.FieldTextInput('');
        layoutField.setTooltip('Default: Right combs\n---\nExample: ["prop1", ["prop2", "props3"]]');
        this.appendDummyInput().appendField('Layout').appendField(layoutField, 'LAYOUT').setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(false);
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

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        if (layout) {
            try {
                layoutArray = JSON.parse(layout.replace(/'/g, '"'));
            } catch {
                Logger.debug('Invalid layout', layout);
            }
        }

        return ST_TVariant(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'type') }), {}),
            layoutArray,
        );
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

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        if (layout) {
            try {
                layoutArray = JSON.parse(layout.replace(/'/g, '"'));
            } catch {
                Logger.debug('Invalid layout', layout);
            }
        }

        return M_TVariant(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'type') }), {}),
            layoutArray,
        );
    },
});

// Field

Blockly.Blocks[BlockKind.record_variant_field_type] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_variant_field_type,
            message0: '%1 with type %2',
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
        this.setPreviousStatement(true, ['RecordVariantFieldType']);
        this.setNextStatement(true, ['RecordVariantFieldType']);
    },
};
