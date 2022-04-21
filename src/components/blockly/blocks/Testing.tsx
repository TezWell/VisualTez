import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Shadow from '../Shadow';
import Value from '../Value';
import { MutezLiteral } from './literals';

export const TestingAction_CreateImplicitAccount = () => (
    <Block type={BlockKind.test__create_implicit_account_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
            <MutezLiteral />
        </Value>
    </Block>
);

export const TestingAction_OriginateContract = () => (
    <Block type={BlockKind.test__originate_contract_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
            <MutezLiteral />
        </Value>
        <Value name="STORAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const TestingAction_AssertAccountBalance = () => (
    <Block type={BlockKind.test__assert_account_balance_action} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
            <MutezLiteral />
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
