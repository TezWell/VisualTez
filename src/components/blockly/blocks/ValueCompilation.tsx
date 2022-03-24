import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';

export const ValueCompilation = () => <Block type={BlockKind.value_compilation} tags={['compilation', 'value']} />;

export default ValueCompilation;
