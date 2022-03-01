import type { Block } from 'blockly';
import Blockly from 'blockly';
import { DefineVar } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { extractVariableName } from '../utils/variables';

const VariableCreationBlock = {
    type: BlockKind.variable_declaration_block,
    message0: 'Let %1 = %2',
    args0: [
        {
            type: 'field_variable',
            name: 'VAR',
            variable: null,
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
    extensions: ['contextMenu_newGetVariableBlock'],
};

Blockly.Blocks[BlockKind.variable_declaration_block] = {
    init: function () {
        this.jsonInit(VariableCreationBlock);
    },
};

SmartML.addBlock(BlockKind.variable_declaration_block, {
    toStatement: (block: Block) => {
        const variableName = extractVariableName(block, 'VAR');
        const value = SmartML.toValue(block, 'VALUE');
        return DefineVar(variableName, value);
    },
});
