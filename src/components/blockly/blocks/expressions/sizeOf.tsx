import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const SizeOf = () => (
    <Block type={BlockKind.size_of} tags={['expression', 'length', 'size', 'list', 'map', 'set', 'bytes', 'string']} />
);
