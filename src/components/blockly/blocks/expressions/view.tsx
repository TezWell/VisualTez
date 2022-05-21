import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const OnChainView = () => (
    <Block type={BlockKind.onchain_view} tags={['view', 'onchain']}>
        <Value name="TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
        <Value name="RETURN">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const CallView = () => (
    <Block type={BlockKind.call_view} tags={['expression', 'view', 'call', 'onchain']}>
        <Value name="ADDRESS">
            <Shadow type={BlockKind.address_literal} />
        </Value>
        <Value name="ARGUMENT">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
        <Value name="OUT_TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
    </Block>
);
