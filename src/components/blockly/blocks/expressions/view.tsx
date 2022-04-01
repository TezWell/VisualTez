import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from '../../Value';
import { AddressLiteral, UnitLiteral } from '../literals';
import { UnitType } from '../types';

export const OnChainView = () => (
    <Block type={BlockKind.onchain_view} tags={['view', 'onchain']}>
        {/* Default input type */}
        <Value name="TYPE">
            <UnitType />
        </Value>
    </Block>
);

export const CallView = () => (
    <Block type={BlockKind.call_view} tags={['expression', 'view', 'call', 'onchain']}>
        <Value name="ADDRESS">
            <AddressLiteral />
        </Value>
        <Value name="ARGUMENT">
            <UnitLiteral />
        </Value>
        <Value name="OUT_TYPE">
            <UnitType />
        </Value>
    </Block>
);
