import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const MutezType = () => (
    <Block type={BlockKind.mutez_type} tags={['type', 'mutez', 'tez', 'amount', 'number', 'integer']} />
);

export default MutezType;
