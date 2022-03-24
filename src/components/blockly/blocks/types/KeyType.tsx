import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const KeyType = () => <Block type={BlockKind.key_type} tags={['type', 'key', 'public key']} />;

export default KeyType;
