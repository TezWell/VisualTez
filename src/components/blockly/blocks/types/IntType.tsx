import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const IntType = () => <Block type={BlockKind.int_type} tags={['type', 'int', 'number', 'integer']} />;

export default IntType;
