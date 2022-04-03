import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const AccessRecordPropertyExpression = () => (
    <Block type={BlockKind.param_access} tags={['expression', 'record', 'property', 'getter']} />
);
