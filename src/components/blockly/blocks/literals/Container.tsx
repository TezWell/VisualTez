import * as React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from 'src/components/blockly/Value';
import Shadow from '../../Shadow';

import { UnitType } from '../types';
import { UnitLiteral } from './Singleton';

export const SequenceItem = () => <Block type={BlockKind.sequence_item} />;
export const ListLiteral = () => (
    <Block type={BlockKind.list_literal} tags={['literal', 'list', 'sequence']}>
        <Value name="items">
            <SequenceItem />
        </Value>
    </Block>
);
export const SetLiteral = () => (
    <Block type={BlockKind.set_literal} tags={['literal', 'set', 'sequence']}>
        <Value name="items">
            <SequenceItem />
        </Value>
    </Block>
);

export const MapEntry = () => <Block type={BlockKind.map_entry} />;
export const MapLiteral = () => (
    <Block type={BlockKind.map_literal} tags={['literal', 'map']}>
        <Value name="entries">
            <MapEntry />
        </Value>
    </Block>
);
export const BigMapLiteral = () => (
    <Block type={BlockKind.big_map_literal} tags={['literal', 'big_map', 'map']}>
        <Value name="entries">
            <MapEntry />
        </Value>
    </Block>
);

export const SomeLiteral = () => <Block type={BlockKind.some_literal} tags={['literal', 'option', 'some']} />;
export const NoneLiteral = () => <Block type={BlockKind.none_literal} tags={['literal', 'option', 'none']} />;
export const NoneWithTypeLiteral = () => (
    <Block type={BlockKind.none_with_type_literal} tags={['literal', 'option', 'none']} />
);

export const PairLiteral = () => <Block type={BlockKind.pair_literal} tags={['literal', 'pair', 'tuple']} />;
export const RecordField = () => <Block type={BlockKind.record_field} />;
export const RecordLiteral = () => (
    <Block type={BlockKind.record_literal} tags={['literal', 'record', 'pair']}>
        <Value name="entries">
            <RecordField />
        </Value>
        <Value name="entries">
            <RecordField />
        </Value>
    </Block>
);

export const LambdaLiteral = () => (
    <Block type={BlockKind.lambda_literal} tags={['literal', 'lambda', 'function']}>
        <Value name="TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
        <Value name="RETURN">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const LeftLiteral = () => <Block type={BlockKind.left_literal_block} tags={['literal', 'variant', 'left']} />;
export const RightLiteral = () => <Block type={BlockKind.right_literal_block} tags={['literal', 'variant', 'right']} />;
export const VariantLiteral = () => <Block type={BlockKind.variant_value} tags={['literal', 'variant']} />;
