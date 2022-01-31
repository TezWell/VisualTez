import type { Block } from 'blockly';
import Blockly from 'blockly';

import { ILiteral } from '@tezwell/smartts-sdk/typings/literal';
import { TRecord } from '@tezwell/smartts-sdk/core/type';
import { Record } from '@tezwell/smartts-sdk/core/literal';
import MichelsonLiteral from '@tezwell/michelson-sdk/literal';
import MichelsonType from '@tezwell/michelson-sdk/type';

import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

Blockly.Blocks[BlockKind.record_literal] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_literal,
            message0: 'Record %1',
            args0: [{ type: 'input_statement', name: 'record_fields', check: 'RecordField' }],
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
        let targetBlock = block.getInputTargetBlock('record_fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return TRecord(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toType(block, 'value') }), {}));
    },
    toValue: (block: Block): ILiteral => {
        let targetBlock = block.getInputTargetBlock('record_fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return Record(fields.reduce((pv, [key, block]) => ({ ...pv, [key]: SmartML.toValue(block, 'value') }), {}));
    },
});

Michelson.addBlock(BlockKind.record_literal, {
    toType: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('record_fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));
        return MichelsonType.TRecord(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toType(block, 'value') }), {}),
        );
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('record_fields');
        if (!targetBlock) {
            throw new Error('The record is empty.');
        }

        const fields = [];
        do {
            fields.push(toFieldBlock(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return MichelsonLiteral.Record(
            fields.reduce((pv, [key, block]) => ({ ...pv, [key]: Michelson.toMichelson(block, 'value') }), {}),
        );
    },
});

Blockly.Blocks[BlockKind.record_field] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.record_field,
            message0: 'key %1 Value %2',
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

SmartML.addBlock(BlockKind.record_field, {
    toFieldBlock: (block: Block) => {
        const key: string = block.getFieldValue('key');
        return [key, block];
    },
});
