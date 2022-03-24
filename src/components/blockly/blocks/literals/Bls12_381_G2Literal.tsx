import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const Bls12_381_G2Literal = () => (
    <Block type={BlockKind.bls12_381_g2_literal} tags={['literal', 'bls12', 'g2', 'bls12_381_g2']} />
);

export default Bls12_381_G2Literal;
