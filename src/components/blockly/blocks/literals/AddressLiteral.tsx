import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const AddressLiteral = () => (
    <Block type={BlockKind.address_literal} tags={['literal', 'address', 'KT1', 'tz1', 'tz2', 'tz3']} />
);

export default AddressLiteral;
