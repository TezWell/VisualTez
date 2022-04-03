import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const DeleteMapEntryStatement = () => (
    <Block type={BlockKind.delete_map_entry} tags={['statement', 'map', 'delete']} />
);
