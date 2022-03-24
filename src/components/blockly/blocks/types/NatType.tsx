import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const NatType = () => <Block type={BlockKind.nat_type} tags={['type', 'nat', 'number', 'integer']} />;

export default NatType;
