import Blockly from 'blockly/core';

const IntBlock = {
    type: 'int_block',
    message0: 'Int %1',
    args0: [
        {
            type: 'field_input',
            name: 'int_value',
            check: 'Number',
        },
    ],
    output: 'Number',
    colour: 10,
};
Blockly.Blocks[IntBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(IntBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};
