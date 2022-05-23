import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { BLAKE2B, HashKey, KECCAK, SHA256, SHA3, SHA512 } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const methods = [
    {
        kind: BlockKind.blake2b,
        text: 'BLAKE2B %1',
        tooltip: 'Compute a Blake2B cryptographic hash.\n-\nTBytes() => TBytes()',
        method: BLAKE2B,
    },
    {
        kind: BlockKind.sha256,
        text: 'SHA256 %1',
        tooltip: 'Compute a SHA256 cryptographic hash.\n-\nTBytes() => TBytes()',
        method: SHA256,
    },
    {
        kind: BlockKind.sha512,
        text: 'SHA512 %1',
        tooltip: 'Compute a SHA512 cryptographic hash.\n-\nTBytes() => TBytes()',
        method: SHA512,
    },
    {
        kind: BlockKind.sha3,
        text: 'SHA3 %1',
        tooltip: 'Compute a SHA3 cryptographic hash.\n-\nTBytes() => TBytes()',
        method: SHA3,
    },
    {
        kind: BlockKind.keccak,
        text: 'KECCAK %1',
        tooltip: 'Compute a KECCAK cryptographic hash.\n-\nTBytes() => TBytes()',
        method: KECCAK,
    },
];

methods.forEach(({ kind, text, tooltip, method }) => {
    Blockly.Blocks[kind] = {
        init: function () {
            this.jsonInit({
                type: kind,
                message0: text,
                args0: [{ type: 'input_value', name: 'BYTES', check: ['Literal', 'Expression'] }],
                colour: 350,
                tooltip,
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

Blockly.Blocks[BlockKind.hash_key] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.hash_key,
            message0: 'Hash key %1',
            args0: [{ type: 'input_value', name: 'KEY', check: ['Literal', 'Expression'] }],
            colour: 350,
            tooltip: 'Compute the Base58Check of a public key.\n-\nTKey() => TKeyHash()',
            inputsInline: true,
            output: ['Expression'],
        });
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};
SmartML.addBlock(BlockKind.hash_key, {
    toValue: (block: Block) => {
        const bytes: IExpression<any> = SmartML.toValue(block, 'KEY');
        return HashKey(bytes, buildErrorInfo(block));
    },
});
