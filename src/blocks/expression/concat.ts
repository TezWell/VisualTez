import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { Concat } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const ConcatBlock = {
    type: BlockKind.concat,
    message0: 'Concat %1',
    args0: [{ type: 'input_value', name: 'LIST', check: ['Literal', 'Expression'] }],
    tooltip: `Concatenates values of type TList(TString()), TList(TBytes()).\n-\n
    (Concat TList(TString())) => TString()\n
    (Concat TList(TBytes())) => TBytes()\n`,
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.concat] = {
    init: function () {
        this.jsonInit(ConcatBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.concat, {
    toValue: (block: Block) => {
        const list: IExpression<any> = SmartML.toValue(block, 'LIST');
        return Concat(list, buildErrorInfo(block));
    },
});
