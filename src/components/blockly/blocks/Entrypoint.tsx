import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Shadow from '../Shadow';
import Value from '../Value';

export const Entrypoint = () => (
    <Block type={BlockKind.entry_point_block} tags={['entrypoint']}>
        {/* Default input type */}
        <Value name="TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
    </Block>
);

export default Entrypoint;
