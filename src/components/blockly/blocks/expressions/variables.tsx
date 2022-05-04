import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetVariableExpression = () => (
    <Block type={BlockKind.variables_get_v2} tags={['expression', 'variable', 'local', 'storage', 'parameter']} />
);
