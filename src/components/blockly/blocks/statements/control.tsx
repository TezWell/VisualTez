import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Value from '../../Value';
import { NatLiteral } from '../literals';

export const ForStatement = () => (
    <Block type={BlockKind.for_block} tags={['statement', 'control', 'loop', 'for']}>
        <Value name="FROM">
            <NatLiteral />
        </Value>
        <Value name="TO">
            <NatLiteral />
        </Value>
        <Value name="BY">
            <NatLiteral />
        </Value>
    </Block>
);
export const ForEachStatement = () => (
    <Block type={BlockKind.for_each_block} tags={['statement', 'control', 'loop', 'for', 'iterate']} />
);

export const WhileStatement = () => (
    <Block type={BlockKind.while_block} tags={['statement', 'control', 'loop', 'while']} />
);
