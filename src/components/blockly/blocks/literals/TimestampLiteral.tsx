import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const TimestampLiteral = () => <Block type={BlockKind.timestamp_literal} tags={['literal', 'timestamp']} />;

export default TimestampLiteral;
