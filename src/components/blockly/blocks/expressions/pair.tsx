import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetFirstElementExpression = () => (
    <Block type={BlockKind.get_first_pair_element} tags={['expression', 'pair', 'first']} />
);
export const GetSecondElementExpression = () => (
    <Block type={BlockKind.get_second_pair_element} tags={['expression', 'pair', 'second']} />
);
