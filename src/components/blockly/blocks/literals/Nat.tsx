import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const NatLiteral = () => <Block type={BlockKind.nat_literal} tags={['literal', 'nat', 'number', 'integer']} />;

export default NatLiteral;
