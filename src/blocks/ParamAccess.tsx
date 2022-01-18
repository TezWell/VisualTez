import Blockly from 'blockly';
import BlockKind from './enums/BlockKind';

const ParamAccessBlock = {
    type: BlockKind.record_field,
    message0: 'Field %1 of %2',
    args0: [
        {
            type: 'field_input',
            name: 'param',
            text: '',
            check: 'String',
        },
        { type: 'input_value', name: 'value', check: 'Literal' },
    ],
    colour: 123,
};

Blockly.Blocks[BlockKind.param_access] = {
    init: function () {
        this.jsonInit(ParamAccessBlock);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
};
