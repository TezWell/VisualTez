import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const ImplicitAccount = () => (
    <Block type={BlockKind.implicit_account} tags={['expression', 'contract', 'key hash', 'implicit account']} />
);
export const GetContractExpression = () => (
    <Block type={BlockKind.get_contract} tags={['expression', 'contract', 'adddress', 'entrypoint']} />
);
