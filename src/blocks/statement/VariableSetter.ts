import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { SetValue } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { buildErrorInfo } from '../utils/errorHandling';

const VariableSetterBlock = {
    type: BlockKind.variable_setter_block,
    message0: 'Assign %1 = %2',
    args0: [
        {
            type: 'input_value',
            name: 'VAR',
            check: ['Variable', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[BlockKind.variable_setter_block] = {
    init: function () {
        this.jsonInit(VariableSetterBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.variable_setter_block, {
    toStatement: (block: Block) => {
        const target = SmartML.toValue(block, 'VAR');
        const value = SmartML.toValue(block, 'VALUE');
        return SetValue(target, value, buildErrorInfo(block));
    },
});
