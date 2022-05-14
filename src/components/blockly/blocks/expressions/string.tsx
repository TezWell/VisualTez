import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const StringStartsWith = () => (
    <Block type={BlockKind.string_starts_with} tags={['expression', 'string', 'starts with']}>
        <Value name="TEXT">
            <Shadow type={BlockKind.string_literal} />
        </Value>
        <Value name="PREFIX">
            <Shadow type={BlockKind.string_literal} />
        </Value>
    </Block>
);
