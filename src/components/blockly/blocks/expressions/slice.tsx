import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from '../../Value';
import { NatLiteral } from '../literals';

export const Slice = () => (
    <Block type={BlockKind.slice} tags={['expression', 'slice', 'bytes']}>
        <Value name="OFFSET">
            <NatLiteral />
        </Value>
        <Value name="LENGTH">
            <NatLiteral />
        </Value>
    </Block>
);
