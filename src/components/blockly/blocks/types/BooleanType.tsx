import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const BooleanType = () => <Block type={BlockKind.boolean_type} tags={['type', 'boolean']} />;

export default BooleanType;
