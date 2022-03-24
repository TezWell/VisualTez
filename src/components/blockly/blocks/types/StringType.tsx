import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const StringType = () => <Block type={BlockKind.string_type} tags={['type', 'string']} />;

export default StringType;
