import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Value from '../Value';

export const OnChainView = () => (
    <Block type={BlockKind.onchain_view} tags={['view', 'on chain view']}>
        {/* Default input type */}
        <Value name="TYPE">
            <Block type={BlockKind.unit_type} />
        </Value>
    </Block>
);

export default OnChainView;
