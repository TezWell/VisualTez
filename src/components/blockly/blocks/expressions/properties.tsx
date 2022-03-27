import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';

export const GetChainIdExpression = () => (
    <Block type={BlockKind.get_chain_id_block} tags={['expression', 'properties', 'chain_id', 'block']} />
);
export const GetLevelExpression = () => (
    <Block type={BlockKind.get_level_block} tags={['expression', 'properties', 'level', 'block']} />
);
export const GetTimestampExpression = () => (
    <Block type={BlockKind.get_timestamp_block} tags={['expression', 'properties', 'timestamp', 'block']} />
);
export const GetTotalVotingPowerExpression = () => (
    <Block type={BlockKind.get_total_voting_power_block} tags={['expression', 'properties', 'voting power', 'block']} />
);
export const GetVotingPowerExpression = () => (
    <Block type={BlockKind.get_voting_power} tags={['expression', 'properties', 'voting power', 'block']} />
);
export const GetAmountExpression = () => (
    <Block type={BlockKind.get_amount_block} tags={['expression', 'properties', 'amount', 'transaction']} />
);
export const GetBalanceExpression = () => (
    <Block
        type={BlockKind.get_balance_block}
        tags={['expression', 'properties', 'balance', 'contract', 'transaction']}
    />
);
export const GetCurrentContractExpression = () => (
    <Block type={BlockKind.get_current_contract_block} tags={['expression', 'contract', 'transaction']} />
);
export const GetCurrentContractAddressExpression = () => (
    <Block
        type={BlockKind.get_current_contract_address_block}
        tags={['expression', 'contract', 'address', 'transaction']}
    />
);
export const GetSenderExpression = () => (
    <Block type={BlockKind.get_sender_block} tags={['expression', 'properties', 'sender', 'transaction']} />
);
export const GetSourceExpression = () => (
    <Block type={BlockKind.get_source_block} tags={['expression', 'properties', 'source', 'transaction']} />
);
