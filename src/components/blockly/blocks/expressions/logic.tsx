import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const Or = () => <Block type={BlockKind.or} tags={['expression', 'logic', 'or']} />;
export const And = () => <Block type={BlockKind.and} tags={['expression', 'logic', 'and']} />;
export const Xor = () => <Block type={BlockKind.xor} tags={['expression', 'logic', 'xor']} />;
