import type { Block } from 'blockly';
import Blockly from 'blockly';

import { List as M_List } from '@tezwell/michelson-sdk/literal';
import { TList as M_TList } from '@tezwell/michelson-sdk/type';
import { TList as ST_TList } from '@tezwell/smartts-sdk/type';
import { List as ST_List } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';

const SetBlock = {
    type: BlockKind.set_literal,
    message0: 'Set %1',
    args0: [{ type: 'input_statement', name: 'items', check: ['SequenceItem'] }],
    output: ['Literal', 'Set'],
    outputShape: 3,
    colour: 40,
};

Blockly.Blocks[BlockKind.set_literal] = {
    init: function () {
        this.jsonInit(SetBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.set_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The (set) is empty.');
        }

        return ST_TList(SmartML.toType(targetBlock, 'value'));
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The (set) is empty.');
        }

        const items = [];
        do {
            items.push(SmartML.toValue(targetBlock, 'value'));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return ST_List(items, buildErrorInfo(block));
    },
});

Michelson.addBlock(BlockKind.set_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The (set) is empty.');
        }

        return M_TList(Michelson.toType(targetBlock, 'value'));
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The (set) is empty.');
        }

        const items = [];
        do {
            items.push(Michelson.toMichelson(targetBlock, 'value'));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return M_List(items);
    },
});
