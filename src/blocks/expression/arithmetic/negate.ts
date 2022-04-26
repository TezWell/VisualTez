import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { Negate } from '@tezwell/smartts-sdk/expression';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const NegateBlock = {
    type: BlockKind.negate_expression,
    message0: 'Negate %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Nat', 'Int', 'Bls12_381_g1', 'Bls12_381_g2', 'Bls12_381_fr', 'Expression'],
        },
    ],
    tooltip: `
    Negate a numerical value.\n-\n
        TNat() => TInt()\n
        TInt() => TInt()\n
        TBls12_381_g1())=> TBls12_381_g1()\n
        TBls12_381_g2() => TBls12_381_g2()\n
        TBls12_381_fr() => TBls12_381_fr()
    `,
    inputsInline: true,
    output: ['Expression'],
    colour: 200,
};

Blockly.Blocks[BlockKind.negate_expression] = {
    init: function () {
        this.jsonInit(NegateBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.negate_expression, {
    toValue: (block: Block) => {
        const value: IExpression<any> = SmartML.toValue(block, 'VALUE');
        return Negate(value, buildErrorInfo(block));
    },
});
