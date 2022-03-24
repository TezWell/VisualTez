import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const KeyHashType = () => (
    <Block type={BlockKind.key_hash_type} tags={['type', 'key_hash', 'public key hash']} />
);

export default KeyHashType;
