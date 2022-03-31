import * as React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const IntType = () => <Block type={BlockKind.int_type} tags={['type', 'int', 'number', 'integer']} />;
export const AddressType = () => <Block type={BlockKind.address_type} tags={['type', 'address']} />;
export const NatType = () => <Block type={BlockKind.nat_type} tags={['type', 'nat', 'number', 'integer']} />;
export const MutezType = () => (
    <Block type={BlockKind.mutez_type} tags={['type', 'mutez', 'tez', 'amount', 'number', 'integer']} />
);
export const BooleanType = () => <Block type={BlockKind.boolean_type} tags={['type', 'boolean']} />;
export const BytesType = () => <Block type={BlockKind.bytes_type} tags={['type', 'bytes']} />;
export const StringType = () => <Block type={BlockKind.string_type} tags={['type', 'string']} />;
export const ChainIdType = () => <Block type={BlockKind.chain_id_type} tags={['type', 'chain_id']} />;
export const Bls12_381_FrType = () => (
    <Block type={BlockKind.bls12_381_fr_type} tags={['type', 'bls12', 'fr', 'bls12_381_fr']} />
);
export const Bls12_381_G1Type = () => (
    <Block type={BlockKind.bls12_381_g1_type} tags={['type', 'bls12', 'g1', 'bls12_381_g1']} />
);
export const Bls12_381_G2Type = () => (
    <Block type={BlockKind.bls12_381_g2_type} tags={['type', 'bls12', 'g2', 'bls12_381_g2']} />
);
export const KeyHashType = () => (
    <Block type={BlockKind.key_hash_type} tags={['type', 'key_hash', 'public key hash']} />
);
export const KeyType = () => <Block type={BlockKind.key_type} tags={['type', 'key', 'public key']} />;
export const OperationType = () => <Block type={BlockKind.operation_type} tags={['type', 'operation']} />;
export const NeverType = () => <Block type={BlockKind.never_type} tags={['type', 'never']} />;
export const SignatureType = () => <Block type={BlockKind.signature_type} tags={['type', 'signature']} />;
export const UnitType = () => <Block type={BlockKind.unit_type} tags={['type', 'unit', 'void']} />;
export const TimestampType = () => <Block type={BlockKind.timestamp_type} tags={['type', 'timestamp']} />;
