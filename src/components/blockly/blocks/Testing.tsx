import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';
import Shadow from '../Shadow';
import Value from '../Value';
import { MutezLiteral, UnitLiteral } from './literals';

export const Testing_CreateImplicitAccount = () => (
    <Block type={BlockKind.test__create_implicit_account} tags={['test', 'testing']}>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
            <MutezLiteral />
        </Value>
    </Block>
);

export const Testing_OriginateContract = () => (
    <Block type={BlockKind.test__originate_contract} tags={['test', 'testing']}>
        <Value name="STORAGE">
            <Shadow type={BlockKind.unit_literal} />
            <UnitLiteral />
        </Value>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
            <MutezLiteral />
        </Value>
    </Block>
);

export const TestTarget = () => <Block type={BlockKind.test} tags={['test', 'testing']} />;
