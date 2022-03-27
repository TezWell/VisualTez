import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Value from '../../Value';
import { UnitLiteral } from '../literals';

export const AssertStatement = () => (
    <Block type={BlockKind.assert_block} tags={['statement', 'assert', 'logic']}>
        {/* Default error message */}
        <UnitLiteral />
    </Block>
);

export const IfStatement = () => <Block type={BlockKind.if_block} tags={['statement', 'if', 'logic']} />;

export const VariantMatchCase = () => (
    <Block type={BlockKind.match_variant_case} tags={['switch', 'match', 'case', 'variant']} />
);
export const VariantMatchStatement = () => (
    <Block type={BlockKind.match_variant} tags={['statement', 'switch', 'match', 'variant', 'logic']}>
        <Value name="CASES">
            <VariantMatchCase />
        </Value>
    </Block>
);
