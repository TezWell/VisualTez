import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const KeyHashLiteral = () => (
    <Block type={BlockKind.key_hash_literal} tags={['literal', 'key_hash', 'public key hash']} />
);

export default KeyHashLiteral;
