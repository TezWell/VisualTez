import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetStorageExpression = () => (
    <Block type={BlockKind.contract_storage_block} tags={['expression', 'variable', 'storage']} />
);
export const GetVariableExpression = () => (
    <Block type={BlockKind.variables_get} tags={['expression', 'variable', 'local']} />
);
