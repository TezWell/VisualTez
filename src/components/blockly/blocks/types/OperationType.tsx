import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const OperationType = () => <Block type={BlockKind.operation_type} tags={['type', 'operation']} />;

export default OperationType;
