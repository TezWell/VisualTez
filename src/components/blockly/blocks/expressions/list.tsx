import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const PrependToListExpression = () => (
    <Block type={BlockKind.prepend_to_list} tags={['expression', 'list', 'prepend']} />
);
