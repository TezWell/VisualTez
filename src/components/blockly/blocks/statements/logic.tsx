import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const AssertStatement = () => (
    <Block type={BlockKind.assert_block} tags={['statement', 'assert', 'logic']}>
        {/* Default error message */}
        <Value name="error_message">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
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
export const FailWithStatement = () => (
    <Block
        type={BlockKind.fail_with_statement}
        tags={['statement', 'fail', 'throw', 'error', 'interrupt', 'terminate']}
    >
        <Value name="ERROR_MESSAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);
