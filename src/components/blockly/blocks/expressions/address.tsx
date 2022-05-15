import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const AddressIsKT1 = () => (
    <Block type={BlockKind.address_is_kt1} tags={['expression', 'address', 'is', 'kt1']}>
        <Value name="ADDRESS">
            <Shadow type={BlockKind.address_literal} />
        </Value>
    </Block>
);
