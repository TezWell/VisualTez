import { Not } from '@tezwell/smartts-sdk';
import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const NotBlock = {
    type: BlockKind.not,
    message0: 'Not %1',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Literal', 'Expression'],
        },
    ],
    tooltip: 'Boolean negation and bitwise complement.\n-\nTBool() => TBool()\nTNat() => TInt()\nTInt() => TInt()',
    colour: 200,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.not] = {
    init: function () {
        this.jsonInit(NotBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.not, {
    toValue: (block: Block) => {
        return Not(SmartML.toValue(block, 'VALUE'), buildErrorInfo(block));
    },
});
