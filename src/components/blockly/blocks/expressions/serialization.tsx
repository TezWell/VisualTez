import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const PackExpression = () => (
    <Block type={BlockKind.pack} tags={['expression', 'serialization', 'pack', 'bytes']} />
);
export const UnpackExpression = () => (
    <Block type={BlockKind.unpack} tags={['expression', 'serialization', 'unpack', 'bytes']}>
        <Value name="VALUE">
            <Shadow type={BlockKind.bytes_literal} />
        </Value>
        <Value name="TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
    </Block>
);
