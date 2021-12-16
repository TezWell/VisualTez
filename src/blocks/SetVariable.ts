import Blockly from 'blockly/core';
import { SetValue } from '@tezwell/smartts-sdk/core/command';

import SmartML from '../generators/SmartML';

const SetVariableBlock = {
    type: 'set_variable_block',
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
        const self = this as any;
        self.jsonInit(SetVariableBlock);
    },
};

SmartML.blocks[SetVariableBlock.type] = {
    toStatement: (block: any) => {
        const variable = SmartML.toValue(block, 'variable');
        const value = SmartML.toValue(block, 'value');
        return SetValue(variable, value);
    },
};
