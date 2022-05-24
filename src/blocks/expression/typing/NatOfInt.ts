import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import { CastToNat } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const NatOfIntBlock = {
    type: BlockKind.nat_of_int,
    message0: 'Cast int to nat %1 or fail with %2',
    args0: [
        { type: 'input_value', name: 'VALUE', check: ['Literal', 'Expression'] },
        { type: 'input_value', name: 'ERROR_MESSAGE', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    tooltip: 'Convert a value of type TInt() to TNat(). It will fail if the value is negative\n-\nTInt() => TNat()',
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.nat_of_int] = {
    init: function () {
        this.jsonInit(NatOfIntBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.nat_of_int, {
    toValue: (block: Block) => {
        const value = SmartML.toValue(block, 'VALUE');
        const errorMsg = SmartML.toValue(block, 'ERROR_MESSAGE');
        return CastToNat(value, errorMsg, buildErrorInfo(block));
    },
});
