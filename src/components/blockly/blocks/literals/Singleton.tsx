import * as React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

export const NatLiteral = () => <Block type={BlockKind.nat_literal} tags={['literal', 'nat', 'number', 'integer']} />;
export const IntLiteral = () => <Block type={BlockKind.int_literal} tags={['literal', 'int', 'number', 'integer']} />;
export const MutezLiteral = () => (
    <Block type={BlockKind.mutez_literal} tags={['literal', 'mutez', 'tez', 'amount', 'number', 'integer']} />
);
export const StringLiteral = () => <Block type={BlockKind.string_literal} tags={['literal', 'string']} />;
export const BytesLiteral = () => <Block type={BlockKind.bytes_literal} tags={['literal', 'bytes']} />;
export const BooleanLiteral = () => (
    <Block type={BlockKind.boolean_literal} tags={['literal', 'boolean', 'true', 'false']} />
);
export const AddressLiteral = () => (
    <Block type={BlockKind.address_literal} tags={['literal', 'address', 'KT1', 'tz1', 'tz2', 'tz3']} />
);
export const ChainIdLiteral = () => <Block type={BlockKind.chain_id_literal} tags={['literal', 'chain_id']} />;
export const UnitLiteral = () => <Block type={BlockKind.unit_literal} tags={['literal', 'unit', 'void']} />;
export const KeyHashLiteral = () => (
    <Block type={BlockKind.key_hash_literal} tags={['literal', 'key_hash', 'public key hash']} />
);
export const KeyLiteral = () => <Block type={BlockKind.key_literal} tags={['literal', 'key', 'public_key']} />;
export const SignatureLiteral = () => <Block type={BlockKind.signature_literal} tags={['literal', 'signature']} />;
export const TimestampLiteral = () => <Block type={BlockKind.timestamp_literal} tags={['literal', 'timestamp']} />;
export const Bls12_381_FrLiteral = () => (
    <Block type={BlockKind.bls12_381_fr_literal} tags={['literal', 'bls12', 'fr', 'bls12_381_fr']} />
);
export const Bls12_381_G1Literal = () => (
    <Block type={BlockKind.bls12_381_g1_literal} tags={['literal', 'bls12', 'g1', 'bls12_381_g1']} />
);
export const Bls12_381_G2Literal = () => (
    <Block type={BlockKind.bls12_381_g2_literal} tags={['literal', 'bls12', 'g2', 'bls12_381_g2']} />
);
