import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const PackExpression = () => (
    <Block type={BlockKind.pack} tags={['expression', 'serialization', 'pack', 'bytes']} />
);
export const UnpackExpression = () => (
    <Block type={BlockKind.unpack} tags={['expression', 'serialization', 'unpack', 'bytes']} />
);
