import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const Concat = () => (
    <Block type={BlockKind.concat} tags={['expression', 'concat', 'bytes', 'string']}>
        <Value name="LIST">
            <Shadow type={BlockKind.list_literal} />
        </Value>
    </Block>
);
