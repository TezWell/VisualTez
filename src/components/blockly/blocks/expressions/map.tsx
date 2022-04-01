import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetMapEntries = () => <Block type={BlockKind.get_map_entries} tags={['expression', 'map', 'entries']} />;
export const GetMapKeys = () => <Block type={BlockKind.get_map_keys} tags={['expression', 'map', 'keys']} />;
export const GetMapValues = () => <Block type={BlockKind.get_map_values} tags={['expression', 'map', 'values']} />;
