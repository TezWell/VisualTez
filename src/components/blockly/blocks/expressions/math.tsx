import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const MathExpression = () => (
    <Block
        type={BlockKind.math_block}
        tags={['expression', 'arithmetic', 'math', 'sum', 'subtract', 'multiply', 'divide']}
    />
);
