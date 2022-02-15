import type { Block } from 'blockly';
import Blockly from 'blockly';

import { TRecord as ST_TRecord } from '@tezwell/smartts-sdk/type';
import { Record as ST_Record } from '@tezwell/smartts-sdk/expression';
import { Record as M_Record } from '@tezwell/michelson-sdk/literal';
import { TRecord as M_TRecord } from '@tezwell/michelson-sdk/type';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

Blockly.Blocks[BlockKind.record_literal] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_literal,
            message0: 'Record %1',
            args0: [{ type: 'input_statement', name: 'entries', check: 'RecordField' }],
            output: ['Literal', 'Record'],
            outputShape: 3,
            colour: 101,
        });
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

const toFieldBlock = (block: Block): [string, Block] => {
    const key: string = block.getFieldValue('key');
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

        if (fields.length < 2) {
            throw new Error('Each record must contain at least two(2) entries.');
        }

        return ST_TRecord(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'value') }), {}));
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

        if (fields.length < 2) {
            throw new Error('Each record must contain at least two(2) entries.');
        }

        return ST_Record(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toValue(block, 'value') }), {}));
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

        return M_TRecord(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'value') }), {}));
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

        return M_Record(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toMichelson(block, 'value') }), {}),
        );
    },
});

Blockly.Blocks[BlockKind.record_field] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_field,
            message0: 'Key %1 Value %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'key',
                    text: '',
                    check: 'String',
                },
                { type: 'input_value', name: 'value', check: 'Literal' },
            ],
            colour: 123,
        });
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};
