import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Value from '../../Value';
import { AddressLiteral, MutezLiteral, UnitLiteral } from '../literals';
import { KeyHashType } from '../types';

export const TransferStatement = () => (
    <Block type={BlockKind.transfer_statement} tags={['statement', 'operation', 'transfer']}>
        <Value name="AMOUNT">
            <MutezLiteral />
        </Value>
        <Value name="ADDRESS">
            <AddressLiteral />
        </Value>
    </Block>
);

export const CallContractStatement = () => (
    <Block type={BlockKind.call_contract_statement} tags={['statement', 'operation', 'transfer', 'contract', 'call']}>
        <Value name="AMOUNT">
            <MutezLiteral />
        </Value>
        <Value name="ARGUMENT">
            <UnitLiteral />
        </Value>
    </Block>
);

export const DelegateStatement = () => (
    <Block type={BlockKind.delegate_statement} tags={['statement', 'operation', 'delegate']}>
        <Value name="DELEGATE">
            <Block type={BlockKind.none_with_type_literal}>
                <Value name="TYPE">
                    <KeyHashType />
                </Value>
            </Block>
        </Value>
    </Block>
);
