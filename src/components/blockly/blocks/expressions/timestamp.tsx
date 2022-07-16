import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const AddTime = () => (
    <Block type={BlockKind.add_time} tags={['expression', 'timestamp', 'add', 'seconds']}>
        <Value name="VALUE">
            <Shadow type={BlockKind.int_literal} />
        </Value>
    </Block>
);
