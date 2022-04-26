import { Unpack } from '@tezwell/smartts-sdk';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const UnpackBlock = {
    type: BlockKind.unpack,
    message0: 'Unpack %1 of type %2',
    args0: [
        {
            type: 'input_value',
            name: 'VALUE',
            check: ['Literal', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'TYPE',
            check: ['Type'],
        },
    ],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.unpack] = {
    init: function () {
        this.jsonInit(UnpackBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.unpack, {
    toValue: (block: Block) => {
        const bytes: IExpression<any> = SmartML.toValue(block, 'VALUE');
        const type = SmartML.toType(block, 'TYPE');
        return Unpack(bytes, type, buildErrorInfo(block));
    },
});
