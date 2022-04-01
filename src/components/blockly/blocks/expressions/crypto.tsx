import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const SHA256 = () => <Block type={BlockKind.sha256} tags={['expression', 'cryptography', 'hash', 'sha256']} />;
export const SHA512 = () => <Block type={BlockKind.sha512} tags={['expression', 'cryptography', 'hash', 'sha512']} />;
export const SHA3 = () => <Block type={BlockKind.sha3} tags={['expression', 'cryptography', 'hash', 'sha3']} />;
export const Keccak = () => <Block type={BlockKind.keccak} tags={['expression', 'cryptography', 'hash', 'keccak']} />;
export const Blake2b = () => (
    <Block type={BlockKind.blake2b} tags={['expression', 'cryptography', 'hash', 'blake2b']} />
);
export const HashKey = () => (
    <Block type={BlockKind.hash_key} tags={['expression', 'hash', 'public key', 'key', 'contract']} />
);
