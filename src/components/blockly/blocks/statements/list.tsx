import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const AddToListStatement = () => (
    <Block type={BlockKind.add_to_list} tags={['statement', 'list', 'append', 'add']} />
);
