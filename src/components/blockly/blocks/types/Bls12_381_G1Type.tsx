import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const Bls12_381_G1Type = () => (
    <Block type={BlockKind.bls12_381_g1_type} tags={['type', 'bls12', 'g1', 'bls12_381_g1']} />
);

export default Bls12_381_G1Type;
