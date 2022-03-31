import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const CheckSignatureExpression = () => (
    <Block type={BlockKind.check_signature} tags={['expression', 'cryptography', 'signature']} />
);
