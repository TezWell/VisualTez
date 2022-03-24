import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const ChainIdLiteral = () => <Block type={BlockKind.chain_id_literal} tags={['literal', 'chain_id']} />;

export default ChainIdLiteral;
