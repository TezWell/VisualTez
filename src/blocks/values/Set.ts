import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Set as M_Set } from '@tezwell/michelson-sdk/literal';
import { TSet as M_TSet } from '@tezwell/michelson-sdk/type';
import { TSet as ST_TSet, TUnknown } from '@tezwell/smartts-sdk/type';
import { Set as ST_Set } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';
import { buildErrorInfo } from '../utils/errorHandling';
import { IValue } from '@tezwell/michelson-sdk/typings';

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
            return ST_TSet(TUnknown());
        }

        return ST_TSet(SmartML.toType(targetBlock, 'value'));
    },
    toValue: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');
        const errorInfo = buildErrorInfo(block);
        const items = [];
        if (targetBlock) {
            do {
                items.push(SmartML.toValue(targetBlock, 'value'));
            } while ((targetBlock = targetBlock.getNextBlock()));
        }
        return ST_Set(items, errorInfo);
    },
});

Michelson.addBlock(BlockKind.set_literal, {
    toType: (block: Block) => {
        const targetBlock = block.getInputTargetBlock('items');
        if (!targetBlock) {
            throw new Error('The (set) is empty.');
        }

        return M_TSet(Michelson.toType(targetBlock, 'value'));
    },
    toMichelson: (block: Block) => {
        let targetBlock = block.getInputTargetBlock('items');

        const items: IValue[] = [];
        if (targetBlock) {
            do {
                items.push(Michelson.toMichelson(targetBlock, 'value'));
            } while ((targetBlock = targetBlock.getNextBlock()));
        }
        return M_Set(items);
    },
});
