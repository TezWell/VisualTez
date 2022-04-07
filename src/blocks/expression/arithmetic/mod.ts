import type { Block } from 'blockly';
import Blockly from 'blockly';

import { Mod } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const ModBlock = {
    type: BlockKind.mod_expression,
    message0: 'Modulo (%1 % %2)',
    args0: [
        {
            type: 'input_value',
            name: 'LEFT',
            check: ['Nat', 'Int', 'Mutez', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'RIGHT',
            check: ['Nat', 'Int', 'Mutez', 'Expression'],
        },
    ],
    tooltip: `
        Get de remainder from euclidean division.\n-\n
        (TNat(), TNat()) => TNat()\n
        (TNat(), TInt()) => TNat()\n
        (TInt(), TNat()) => TNat()\n
        (TMutez(), TNat()) => TMutez()\n
        (TMutez(), TMutez()) => TMutez()
    `,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.mod_expression] = {
    init: function () {
        this.jsonInit(ModBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.mod_expression, {
    toValue: (block: Block) => {
        const left: IExpression<any> = SmartML.toValue(block, 'LEFT');
        const right: IExpression<any> = SmartML.toValue(block, 'RIGHT');
        return Mod(left, right, buildErrorInfo(block));
    },
});
