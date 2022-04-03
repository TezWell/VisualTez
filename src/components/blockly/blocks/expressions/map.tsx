import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const GetMapEntriesExpression = () => (
    <Block type={BlockKind.get_map_entries} tags={['expression', 'map', 'entries']} />
);
export const GetMapKeysExpression = () => <Block type={BlockKind.get_map_keys} tags={['expression', 'map', 'keys']} />;
export const GetMapValuesExpression = () => (
    <Block type={BlockKind.get_map_values} tags={['expression', 'map', 'values']} />
);
export const GetMapValueExpression = () => (
    <Block type={BlockKind.get_map_value} tags={['expression', 'map', 'getter']} />
);
export const MapConstainsKeyExpression = () => (
    <Block type={BlockKind.map_contains_key} tags={['expression', 'map', 'contains']} />
);
