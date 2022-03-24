import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const Bls12_381_FrType = () => (
    <Block type={BlockKind.bls12_381_fr_type} tags={['type', 'bls12', 'fr', 'bls12_381_fr']} />
);

export default Bls12_381_FrType;
