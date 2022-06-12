import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const CreateTicket = () => (
    <Block type={BlockKind.create_ticket_expression} tags={['expression', 'ticket']}>
        <Value name="QUANTITY">
            <Shadow type={BlockKind.nat_literal} />
        </Value>
    </Block>
);
