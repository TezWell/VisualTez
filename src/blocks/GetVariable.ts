import Blockly from 'blockly/core';

const GetVariableBlock = {
    type: 'get_variable_block',
    message0: 'Get %1',
    args0: [
        {
            type: 'field_variable',
            name: 'variable',
        },
    ],
    output: null,
    colour: 80,
};

Blockly.Blocks[GetVariableBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(GetVariableBlock);
    },
};
