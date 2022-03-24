import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const UnitLiteral = () => <Block type={BlockKind.unit_literal} tags={['literal', 'unit', 'void']} />;

export default UnitLiteral;
