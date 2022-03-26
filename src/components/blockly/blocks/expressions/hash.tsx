import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const SHA256 = () => <Block type={BlockKind.sha256} tags={['cryptography', 'hash', 'sha256']} />;
export const SHA512 = () => <Block type={BlockKind.sha512} tags={['cryptography', 'hash', 'sha512']} />;
export const SHA3 = () => <Block type={BlockKind.sha3} tags={['cryptography', 'hash', 'sha3']} />;
export const Keccak = () => <Block type={BlockKind.keccak} tags={['cryptography', 'hash', 'keccak']} />;
export const Blake2b = () => <Block type={BlockKind.blake2b} tags={['cryptography', 'hash', 'blake2b']} />;
