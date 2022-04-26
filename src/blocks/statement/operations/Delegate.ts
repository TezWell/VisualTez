import { SetDelegate } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const DelegateBlock = {
    type: BlockKind.delegate_statement,
    message0: 'Set delegate %1',
    args0: [
        {
            type: 'input_value',
            name: 'DELEGATE',
            check: ['Literal', 'Expression'],
        },
    ],
    colour: 220,
};

Blockly.Blocks[BlockKind.delegate_statement] = {
    init: function () {
        this.jsonInit(DelegateBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.delegate_statement, {
    toStatement: (block: Block) => {
        const delegate: IExpression<any> = SmartML.toValue(block, 'DELEGATE');

        const line = buildErrorInfo(block);

        return SetDelegate(delegate, line).send(line);
    },
});
