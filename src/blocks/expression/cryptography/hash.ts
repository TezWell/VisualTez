import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { BLAKE2B, KECCAK, SHA256, SHA3, SHA512 } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const methods = [
    {
        kind: BlockKind.blake2b,
        text: 'BLAKE2B %1',
        method: BLAKE2B,
    },
    {
        kind: BlockKind.sha256,
        text: 'SHA256 %1',
        method: SHA256,
    },
    {
        kind: BlockKind.sha512,
        text: 'SHA512 %1',
        method: SHA512,
    },
    {
        kind: BlockKind.sha3,
        text: 'SHA3 %1',
        method: SHA3,
    },
    {
        kind: BlockKind.keccak,
        text: 'KECCAK %1',
        method: KECCAK,
    },
];

methods.forEach(({ kind, text, method }) => {
    Blockly.Blocks[kind] = {
        init: function () {
            this.jsonInit({
                type: kind,
                message0: text,
                args0: [{ type: 'input_value', name: 'BYTES', check: ['Literal', 'Expression'] }],
                colour: 200,
                inputsInline: true,
                output: ['Expression'],
            });
            this.setPreviousStatement(false);
            this.setNextStatement(false);
        },
    };

    SmartML.addBlock(kind, {
        toValue: (block: Block) => {
            const bytes: IExpression<any> = SmartML.toValue(block, 'BYTES');
            return method(bytes, buildErrorInfo(block));
        },
    });
});
