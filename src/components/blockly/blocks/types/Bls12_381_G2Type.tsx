import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const Bls12_381_G2Type = () => (
    <Block type={BlockKind.bls12_381_g2_type} tags={['type', 'bls12', 'g2', 'bls12_381_g2']} />
);

export default Bls12_381_G2Type;
