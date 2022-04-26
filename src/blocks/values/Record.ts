import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { TRecord as ST_TRecord } from '@tezwell/smartts-sdk/type';
import { Record as ST_Record } from '@tezwell/smartts-sdk/expression';
import { Record as M_Record } from '@tezwell/michelson-sdk/literal';
import { TRecord as M_TRecord } from '@tezwell/michelson-sdk/type';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

Blockly.Blocks[BlockKind.record_literal] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_literal,
            message0: 'Record %1',
            args0: [{ type: 'input_statement', name: 'entries', check: ['RecordField'] }],
            output: ['Literal', 'Record'],
            outputShape: 3,
            colour: 40,
        });
        const layoutField = new Blockly.FieldTextInput('');
        layoutField.setTooltip('Default: Right combs\n---\nExample: ["prop1", ["prop2", "props3"]]');
        this.appendDummyInput().appendField('Layout').appendField(layoutField, 'LAYOUT').setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

const toFieldBlock = (block: Block): [string, Block] => {
    const key: string = block.getFieldValue('field');
    return [key, block];
};

SmartML.addBlock(BlockKind.record_literal, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        try {
            layoutArray = layout ? JSON.parse(layout) : undefined;
        } catch {
            /* Ignore parsing error */
        }

        return ST_TRecord(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'value') }), {}),
            layoutArray,
        );
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return ST_Record(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toValue(block, 'value') }), {}),
            buildErrorInfo(block),
        );
    },
});

Michelson.addBlock(BlockKind.record_literal, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        if (fields.length < 2) {
            throw new Error('Each record must contain at least two(2) entries.');
        }

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        try {
            layoutArray = layout ? JSON.parse(layout) : undefined;
        } catch {
            /* Ignore parsing error */
        }

        return M_TRecord(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'value') }), {}),
            layoutArray,
        );
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('entries');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        if (fields.length < 2) {
            throw new Error('Each record must contain at least two(2) entries.');
        }

        const layout = block.getFieldValue('LAYOUT');
        let layoutArray = undefined;
        try {
            layoutArray = layout ? JSON.parse(layout) : undefined;
        } catch {
            /* Ignore parsing error */
        }

        return M_Record(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toMichelson(block, 'value') }), {}),
            layoutArray,
        );
    },
});

Blockly.Blocks[BlockKind.record_field] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_field,
            message0: 'Field %1 Value %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'field',
                    text: '',
                    check: 'String',
                },
                { type: 'input_value', name: 'value', check: ['Literal', 'Expression'] },
            ],
            colour: 50,
        });
        this.setPreviousStatement(true, ['RecordField']);
        this.setNextStatement(true, ['RecordField']);
    },
};
