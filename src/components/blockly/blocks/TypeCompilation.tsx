import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';

export const TypeCompilation = () => <Block type={BlockKind.type_compilation} tags={['compilation', 'type']} />;

export default TypeCompilation;
