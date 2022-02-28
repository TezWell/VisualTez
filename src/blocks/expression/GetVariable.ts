import Blockly from 'blockly';
import BlockKind from '../enums/BlockKind';

const GetVariableBlock = {
    type: BlockKind.get_variable_block,
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
        this.jsonInit(GetVariableBlock);
    },
};
