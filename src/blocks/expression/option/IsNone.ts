import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { isSome } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const IsNoneBlock = {
    type: BlockKind.is_none,
    message0: 'Is %1 of variant None?',
    args0: [{ type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] }],
    tooltip:
        'Inspects an optional value. It returns True if the value is of variant None, and False otherwise.\n-\nTBool()',
    colour: 200,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.is_none] = {
    init: function () {
        this.jsonInit(IsNoneBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.is_none, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return isSome(value, buildErrorInfo(block));
    },
});
