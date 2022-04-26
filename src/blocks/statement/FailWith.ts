import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { FailWith } from '@tezwell/smartts-sdk/statement';
import { Unit } from '@tezwell/smartts-sdk';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { buildErrorInfo } from '../utils/errorHandling';

const FailWithBlock = {
    type: BlockKind.fail_with_statement,
    message0: 'Fail with %1',
    args0: [
        {
            type: 'input_value',
            name: 'ERROR_MESSAGE',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 20,
};

Blockly.Blocks[FailWithBlock.type] = {
    init: function () {
        this.jsonInit(FailWithBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(FailWithBlock.type, {
    toStatement: (block: Block) => {
        const failWithMsg = SmartML.toValue(block, 'ERROR_MESSAGE', Unit());
        return FailWith(failWithMsg, buildErrorInfo(block));
    },
});
