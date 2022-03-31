import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Value from '../Value';
import { UnitType } from './types';

export const Entrypoint = () => (
    <Block type={BlockKind.entry_point_block} tags={['entrypoint']}>
        {/* Default input type */}
        <Value name="TYPE">
            <UnitType />
        </Value>
    </Block>
);

export default Entrypoint;
