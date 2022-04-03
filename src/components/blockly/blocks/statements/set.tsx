import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const RemoveElementFromSetStatement = () => (
    <Block type={BlockKind.remove_element_from_set} tags={['statement', 'set', 'remove', 'add']} />
);
export const AddElementToSetStatement = () => (
    <Block type={BlockKind.add_element_to_set} tags={['statement', 'set', 'add']} />
);
