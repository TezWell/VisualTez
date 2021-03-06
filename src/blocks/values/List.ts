import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { List as M_List } from '@tezwell/michelson-sdk/literal';
import { TList as M_TList } from '@tezwell/michelson-sdk/type';
import { TList as ST_TList, TUnknown } from '@tezwell/smartts-sdk/type';
import { List as ST_List } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const ListBlock = {
    type: BlockKind.list_literal,
    message0: 'List %1',
    args0: [{ type: 'input_statement', name: 'items', check: ['SequenceItem'] }],
    output: ['Literal', 'List'],
    outputShape: 3,
    colour: 40,
};

Blockly.Blocks[BlockKind.list_literal] = {
    init: function () {
        this.jsonInit(ListBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.list_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            return ST_TList(TUnknown());
        }

        return ST_TList(SmartML.toType(targetBlock, 'value'));
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');
        const line = buildErrorInfo(block);

        const items = [];
        if (targetBlock) {
            do {
                items.push(SmartML.toValue(targetBlock, 'value'));
            } while ((targetBlock = targetBlock.getNextBlock()));
        }
        return ST_List(items, line);
    },
});

Michelson.addBlock(BlockKind.list_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The list is empty.');
        }

        return M_TList(Michelson.toType(targetBlock, 'value'));
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');

        const items = [];
        if (targetBlock) {
            do {
                items.push(Michelson.toMichelson(targetBlock, 'value'));
            } while ((targetBlock = targetBlock.getNextBlock()));
        }
        return M_List(items);
    },
});

Blockly.Blocks[BlockKind.sequence_item] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.sequence_item,
            message0: 'Element %1',
            args0: [
                {
                    type: 'input_value',
                    name: 'value',
                    check: ['Literal', 'Expression'],
                },
            ],
            colour: 50,
        });
        this.setPreviousStatement(true, ['SequenceItem']);
        this.setNextStatement(true, ['SequenceItem']);
    },
};
