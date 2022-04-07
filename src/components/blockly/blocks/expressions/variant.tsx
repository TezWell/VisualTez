import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import { Shadow } from '../..';
import Value from '../../Value';

export const IsVariantExpression = () => (
    <Block type={BlockKind.is_variant_expression} tags={['expression', 'variant', 'or', 'Left', 'Right']} />
);
export const OpenVariantExpression = () => (
    <Block type={BlockKind.open_variant_expression} tags={['expression', 'open', 'variant', 'or', 'Left', 'Right']}>
        <Value name="ERROR_MESSAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);
