import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const VariableSetterStatement = () => (
    <Block type={BlockKind.variable_setter_block} tags={['statement', 'variable', 'setter', 'update', 'change']}>
        <Value name="VAR">
            <Shadow type={BlockKind.variables_get} />
        </Value>
    </Block>
);
