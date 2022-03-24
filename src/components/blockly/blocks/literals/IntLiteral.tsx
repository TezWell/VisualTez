import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const IntLiteral = () => <Block type={BlockKind.int_literal} tags={['literal', 'int', 'number', 'integer']} />;

export default IntLiteral;
