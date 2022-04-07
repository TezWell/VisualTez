import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const GetElementsFromSetExpression = () => (
    <Block type={BlockKind.get_elements_from_set} tags={['expression', 'set', 'getter']} />
);

export const SetContainsElementExpression = () => (
    <Block type={BlockKind.set_contains_element_expression} tags={['expression', 'set', 'contains']} />
);
