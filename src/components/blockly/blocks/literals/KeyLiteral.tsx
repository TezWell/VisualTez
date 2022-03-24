import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const KeyLiteral = () => <Block type={BlockKind.key_literal} tags={['literal', 'key', 'public_key']} />;

export default KeyLiteral;
