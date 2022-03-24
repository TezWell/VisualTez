import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Value from '../Value';
import Entrypoint from './Entrypoint';

export const Contract = () => (
    <Block type={BlockKind.contract_block} tags={['contract']}>
        {/* Default storage type */}
        <Value name="TYPE">
            <Block type={BlockKind.unit_type} />
        </Value>
        {/* Default storage value */}
        <Value name="initial_storage">
            <Block type={BlockKind.unit_literal} />
        </Value>
        {/* Default empty entry point */}
        <Value name="entry_points">
            <Entrypoint />
        </Value>
    </Block>
);

export default Contract;
