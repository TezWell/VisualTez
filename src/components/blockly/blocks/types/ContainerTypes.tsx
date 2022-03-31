import * as React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from '../../Value';

export const ListType = () => <Block type={BlockKind.list_type} tags={['type', 'list', 'array', 'sequence']} />;
export const SetType = () => <Block type={BlockKind.set_type} tags={['type', 'set', 'array', 'sequence']} />;
export const OptionType = () => (
    <Block type={BlockKind.option_type} tags={['type', 'option', 'some', 'none', 'optional']} />
);
export const MapType = () => <Block type={BlockKind.map_type} tags={['type', 'map', 'sequence']} />;
export const BigMapType = () => <Block type={BlockKind.big_map_type} tags={['type', 'big_map', 'map', 'sequence']} />;
export const PairType = () => <Block type={BlockKind.pair_type} tags={['type', 'pair', 'tuple']} />;
export const LambdaType = () => <Block type={BlockKind.lambda_type} tags={['type', 'lambda', 'function']} />;
export const TicketType = () => <Block type={BlockKind.ticket_type} tags={['type', 'ticket']} />;
export const ContractType = () => <Block type={BlockKind.contract_type} tags={['type', 'contract']} />;
export const SaplingStateType = () => <Block type={BlockKind.sapling_state_type} tags={['type', 'sapling']} />;
export const SaplingTransactionType = () => (
    <Block type={BlockKind.sapling_transaction_type} tags={['type', 'sapling']} />
);

export const RecordVariantTypeEntry = () => <Block type={BlockKind.record_variant_field_type} />;
export const RecordType = () => (
    <Block type={BlockKind.record_type} tags={['type', 'record', 'pair']}>
        <Value name="fields">
            <RecordVariantTypeEntry />
        </Value>
        <Value name="fields">
            <RecordVariantTypeEntry />
        </Value>
    </Block>
);
export const VariantType = () => (
    <Block type={BlockKind.variant_type} tags={['type', 'variant', 'or']}>
        <Value name="fields">
            <RecordVariantTypeEntry />
        </Value>
        <Value name="fields">
            <RecordVariantTypeEntry />
        </Value>
    </Block>
);
