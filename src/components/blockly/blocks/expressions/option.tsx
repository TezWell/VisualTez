import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetSomeExpression = () => (
    <Block type={BlockKind.get_some} tags={['expression', 'option', 'open', 'some']} />
);
