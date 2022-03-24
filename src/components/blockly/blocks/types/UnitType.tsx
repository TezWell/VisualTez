import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const UnitType = () => <Block type={BlockKind.unit_type} tags={['type', 'unit', 'void']} />;

export default UnitType;
