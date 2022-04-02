import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetSomeExpression = () => (
    <Block type={BlockKind.get_some} tags={['expression', 'option', 'open', 'some']} />
);
export const IsSomeExpression = () => (
    <Block type={BlockKind.is_some} tags={['expression', 'option', 'some', 'check']} />
);
export const IsNoneExpression = () => (
    <Block type={BlockKind.is_none} tags={['expression', 'option', 'none', 'check']} />
);
