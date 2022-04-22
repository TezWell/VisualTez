import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Field from '../Field';
import Shadow from '../Shadow';
import Value from '../Value';

export const TestingAction_CreateImplicitAccount = () => (
    <Block type={BlockKind.test__create_implicit_account_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
    </Block>
);

export const TestingAction_OriginateContract = () => (
    <Block type={BlockKind.test__originate_contract_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
        <Value name="STORAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const TestingAction_CallContract = () => (
    <Block type={BlockKind.test__call_contract_action} tags={['test', 'testing']}>
        <Value name="LEVEL">
            <Shadow type={BlockKind.nat_literal}>
                <Field name="nat_value">1</Field>
            </Shadow>
        </Value>
        <Value name="AMOUNT">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
        <Value name="ARGUMENT">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);
export const TestingAction_ModifyChainID = () => (
    <Block type={BlockKind.test__modify_chain_id_action} tags={['test', 'testing']}>
        <Value name="CHAIN_ID">
            <Shadow type={BlockKind.chain_id_literal} />
        </Value>
    </Block>
);

export const TestingAction_AssertAccountBalance = () => (
    <Block type={BlockKind.test__assert_account_balance_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
    </Block>
);

export const TestingAction_AssertContractStorage = () => (
    <Block type={BlockKind.test__assert_contract_storage_action} tags={['test', 'testing']}>
        <Value name="STORAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const Testing_AddressOfAccount = () => (
    <Block type={BlockKind.test__address_of_account} tags={['test', 'testing']} />
);

export const Testing_BalanceOfAccount = () => (
    <Block type={BlockKind.test__balance_of_account} tags={['test', 'testing']} />
);

export const TestTarget = () => <Block type={BlockKind.test} tags={['test', 'testing']} />;
