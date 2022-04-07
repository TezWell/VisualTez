import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const ForStatement = () => (
    <Block type={BlockKind.for_block} tags={['statement', 'control', 'loop', 'for']}>
        <Value name="FROM">
            <Shadow type={BlockKind.nat_literal} />
        </Value>
        <Value name="TO">
            <Shadow type={BlockKind.nat_literal} />
        </Value>
        <Value name="BY">
            <Shadow type={BlockKind.nat_literal} />
        </Value>
    </Block>
);
export const ForEachStatement = () => (
    <Block type={BlockKind.for_each_block} tags={['statement', 'control', 'loop', 'for', 'iterate']} />
);

export const WhileStatement = () => (
    <Block type={BlockKind.while_block} tags={['statement', 'control', 'loop', 'while']} />
);
