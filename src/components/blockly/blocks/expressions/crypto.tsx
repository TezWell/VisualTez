import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const SHA256 = () => (
    <Block type={BlockKind.sha256} tags={['expression', 'cryptography', 'hash', 'sha256']}>
        <Value name="BYTES">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
    </Block>
);
export const SHA512 = () => (
    <Block type={BlockKind.sha512} tags={['expression', 'cryptography', 'hash', 'sha512']}>
        <Value name="BYTES">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
    </Block>
);
export const SHA3 = () => (
    <Block type={BlockKind.sha3} tags={['expression', 'cryptography', 'hash', 'sha3']}>
        <Value name="BYTES">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
    </Block>
);
export const Keccak = () => (
    <Block type={BlockKind.keccak} tags={['expression', 'cryptography', 'hash', 'keccak']}>
        <Value name="BYTES">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
    </Block>
);
export const Blake2b = () => (
    <Block type={BlockKind.blake2b} tags={['expression', 'cryptography', 'hash', 'blake2b']}>
        <Value name="BYTES">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
    </Block>
);
export const HashKey = () => (
    <Block type={BlockKind.hash_key} tags={['expression', 'hash', 'public key', 'key', 'contract']}>
        <Value name="KEY">
            <Shadow type={BlockKind.key_literal} />
        </Value>
    </Block>
);
