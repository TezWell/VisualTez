import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const SignatureLiteral = () => <Block type={BlockKind.signature_literal} tags={['literal', 'signature']} />;

export default SignatureLiteral;
