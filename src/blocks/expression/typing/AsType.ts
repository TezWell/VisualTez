import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { AsType } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const AsTypeBlock = {
    type: BlockKind.as_type,
    message0: '%1 as type %2',
    args0: [
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'TYPE', check: ['Type'] },
    ],
    colour: 200,
    tooltip: 'Explicitly set the type of a value.',
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.as_type] = {
    init: function () {
        this.jsonInit(AsTypeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.as_type, {
    toValue: (block: Block) => {
        const value = SmartML.toValue(block, 'VALUE');
        const type = SmartML.toType(block, 'TYPE');
        return AsType(value, type, buildErrorInfo(block));
    },
});
