import type { Block } from 'blockly';
import Blockly from 'blockly';
import { SetValue } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const VariableSetterBlock = {
    type: BlockKind.variable_setter_block,
    message0: 'Set variable %1 to be %2',
    args0: [
        {
            type: 'input_value',
            name: 'VAR',
        },
        {
            type: 'input_value',
            name: 'VALUE',
        },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    inputsInline: true,
    tooltip: '%{BKY_VARIABLES_SET_TOOLTIP}',
    helpUrl: '%{BKY_VARIABLES_SET_HELPURL}',
    extensions: ['contextMenu_variableSetterGetter'],
};

Blockly.Blocks[BlockKind.variable_setter_block] = {
    init: function () {
        this.jsonInit(VariableSetterBlock);
    },
};

SmartML.addBlock(BlockKind.variable_setter_block, {
    toStatement: (block: Block) => {
        const target = SmartML.toValue(block, 'VAR');
        const value = SmartML.toValue(block, 'VALUE');
        return SetValue(target, value);
    },
});
