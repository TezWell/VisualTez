import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from '../../Value';
import { UnitLiteral } from '../literals';

export const CallLambda = () => (
    <Block type={BlockKind.call_lambda} tags={['expression', 'lambda', 'call']}>
        <Value name="ARGUMENT">
            <UnitLiteral />
        </Value>
    </Block>
);
