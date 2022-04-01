import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const Concat = () => <Block type={BlockKind.concat} tags={['expression', 'concat', 'bytes', 'string']} />;
