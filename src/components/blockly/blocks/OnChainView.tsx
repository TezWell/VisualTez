import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Value from '../Value';
import { UnitType } from './types';

export const OnChainView = () => (
    <Block type={BlockKind.onchain_view} tags={['view', 'on chain view']}>
        {/* Default input type */}
        <Value name="TYPE">
            <UnitType />
        </Value>
    </Block>
);

export default OnChainView;
