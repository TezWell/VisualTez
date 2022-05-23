import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';

import { CheckSignature } from '@tezwell/smartts-sdk/expression';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const CheckSignatureBlock = {
    type: BlockKind.check_signature,
    message0: 'Check if signature %1 of content %2 was signed by %3',
    args0: [
        {
            type: 'input_value',
            name: 'SIGNATURE',
            check: ['Signature', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'BYTES',
            check: ['Bytes', 'Expression'],
        },
        {
            type: 'input_value',
            name: 'KEY',
            check: ['Key', 'Expression'],
        },
    ],
    tooltip:
        'Verifies that a byte sequence has been signed with a given key.\n-\n(TSignature(), TBytes(), TKey()) => TBool()',
    inputsInline: true,
    output: ['Expression'],
    colour: 350,
};

Blockly.Blocks[BlockKind.check_signature] = {
    init: function () {
        this.jsonInit(CheckSignatureBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.check_signature, {
    toValue: (block: Block) => {
        const key: IExpression<any> = SmartML.toValue(block, 'KEY');
        const signature: IExpression<any> = SmartML.toValue(block, 'SIGNATURE');
        const bytes: IExpression<any> = SmartML.toValue(block, 'BYTES');
        return CheckSignature(key, signature, bytes, buildErrorInfo(block));
    },
});
