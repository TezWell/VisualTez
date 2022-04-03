import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const AsTypeExpression = () => <Block type={BlockKind.as_type} tags={['expression', 'type']} />;
export const IntOfNatExpression = () => (
    <Block type={BlockKind.int_of_nat} tags={['expression', 'typing', 'int', 'nat']} />
);
export const NatOfIntExpression = () => (
    <Block type={BlockKind.nat_of_int} tags={['expression', 'typing', 'int', 'nat']} />
);
