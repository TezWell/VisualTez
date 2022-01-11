import type { Block } from 'blockly';
import Blockly from 'blockly';
import { SetValue } from '@tezwell/smartts-sdk/core/command';

import SmartML from './generators/SmartML';
import BlockKind from './enums/BlockKind';

const SetVariableBlock = {
    type: BlockKind.set_variable_block,
    message0: 'Set %1 to %2',
    args0: [
        {
            type: 'input_value',
            name: 'variable',
        },
        {
            type: 'input_value',
            name: 'value',
        },
    ],
    inputsInline: true,
    colour: 70,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[SetVariableBlock.type] = {
    init: function () {
        this.jsonInit(SetVariableBlock);
    },
};

SmartML.addBlock(SetVariableBlock.type, {
    toStatement: (block: Block) => {
        const variable = SmartML.toValue(block, 'variable');
        const value = SmartML.toValue(block, 'value');
        return SetValue(variable, value);
    },
});
