import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const StringLiteral = () => <Block type={BlockKind.string_literal} tags={['literal', 'string']} />;

export default StringLiteral;
