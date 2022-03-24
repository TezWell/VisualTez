import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const BooleanLiteral = () => (
    <Block type={BlockKind.boolean_literal} tags={['literal', 'boolean', 'true', 'false']} />
);

export default BooleanLiteral;
