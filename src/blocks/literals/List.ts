import type { Block } from 'blockly';
import Blockly from 'blockly';

import { List as M_List } from '@tezwell/michelson-sdk/literal';
import { TList as M_TList } from '@tezwell/michelson-sdk/type';
import { TList as ST_TList, TUnknown } from '@tezwell/smartts-sdk/type';
import { List as ST_List } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const ListBlock = {
    type: BlockKind.list_literal,
    message0: 'List %1',
    args0: [{ type: 'input_statement', name: 'items', check: 'Literal' }],
    output: ['Literal', 'List'],
    outputShape: 3,
    colour: 380,
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
        if (!targetBlock) {
            return ST_List([]);
        }

        const items = [];
        do {
            items.push(SmartML.toValue(targetBlock, 'value'));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return ST_List(items);
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
        if (!targetBlock) {
            return M_List([]);
        }

        const items = [];
        do {
            items.push(Michelson.toMichelson(targetBlock, 'value'));
        } while ((targetBlock = targetBlock.getNextBlock()));

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
                    check: 'Literal',
                },
            ],
            colour: 370,
        });
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};
