import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const OrExpression = () => <Block type={BlockKind.or} tags={['expression', 'logic', 'or']} />;
export const AndExpression = () => <Block type={BlockKind.and} tags={['expression', 'logic', 'and']} />;
export const XorExpression = () => <Block type={BlockKind.xor} tags={['expression', 'logic', 'xor']} />;
export const NotExpression = () => <Block type={BlockKind.not} tags={['expression', 'logic', 'not']} />;
export const CompareExpression = () => (
    <Block type={BlockKind.compare_block} tags={['expression', 'compare', 'equal', 'greater', 'less']} />
);
