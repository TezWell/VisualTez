import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const BytesType = () => <Block type={BlockKind.bytes_type} tags={['type', 'bytes']} />;

export default BytesType;
