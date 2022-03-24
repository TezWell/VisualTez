import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const BytesLiteral = () => <Block type={BlockKind.bytes_literal} tags={['literal', 'bytes']} />;

export default BytesLiteral;
