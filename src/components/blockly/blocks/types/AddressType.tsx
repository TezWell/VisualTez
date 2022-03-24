import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const AddressType = () => <Block type={BlockKind.address_type} tags={['type', 'address']} />;

export default AddressType;
