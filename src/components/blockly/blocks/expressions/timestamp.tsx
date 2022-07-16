import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const AddSeconds = () => (
    <Block type={BlockKind.add_seconds} tags={['expression', 'timestamp', 'add', 'seconds']}>
        <Value name="SECONDS">
            <Shadow type={BlockKind.int_literal} />
        </Value>
    </Block>
);

export const AddMinutes = () => (
    <Block type={BlockKind.add_minutes} tags={['expression', 'timestamp', 'add', 'minutes']}>
        <Value name="MINUTES">
            <Shadow type={BlockKind.int_literal} />
        </Value>
    </Block>
);

export const AddHours = () => (
    <Block type={BlockKind.add_hours} tags={['expression', 'timestamp', 'add', 'hours']}>
        <Value name="HOURS">
            <Shadow type={BlockKind.int_literal} />
        </Value>
    </Block>
);
