import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const MutezLiteral = () => (
    <Block type={BlockKind.mutez_literal} tags={['literal', 'mutez', 'tez', 'amount', 'number', 'integer']} />
);

export default MutezLiteral;
