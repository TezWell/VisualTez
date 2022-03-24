import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const TimestampType = () => <Block type={BlockKind.timestamp_type} tags={['type', 'timestamp']} />;

export default TimestampType;
