import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const SignatureType = () => <Block type={BlockKind.signature_type} tags={['type', 'signature']} />;

export default SignatureType;
