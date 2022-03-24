import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const NeverType = () => <Block type={BlockKind.never_type} tags={['type', 'never']} />;

export default NeverType;
