import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const ChainIdType = () => <Block type={BlockKind.chain_id_type} tags={['type', 'chain_id']} />;

export default ChainIdType;
