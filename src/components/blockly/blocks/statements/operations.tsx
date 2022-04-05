import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../../Block';
import Shadow from '../../Shadow';
import Value from '../../Value';
import Entrypoint from '../Entrypoint';
import { KeyHashType } from '../types';

export const TransferStatement = () => (
    <Block type={BlockKind.transfer_statement} tags={['statement', 'operation', 'transfer']}>
        <Value name="AMOUNT">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
        <Value name="ADDRESS">
            <Shadow type={BlockKind.address_literal} />
        </Value>
    </Block>
);

export const CallContractStatement = () => (
    <Block type={BlockKind.call_contract_statement} tags={['statement', 'operation', 'transfer', 'contract', 'call']}>
        <Value name="AMOUNT">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
        <Value name="ARGUMENT">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
    </Block>
);

export const DelegateStatement = () => (
    <Block type={BlockKind.delegate_statement} tags={['statement', 'operation', 'delegate']}>
        <Value name="DELEGATE">
            <Shadow type={BlockKind.none_with_type_literal}>
                <Value name="TYPE">
                    <Shadow type={BlockKind.key_hash_type} />
                </Value>
            </Shadow>
        </Value>
    </Block>
);

export const CreateContractStatement = () => (
    <Block type={BlockKind.create_contract_statement} tags={['statement', 'operation', 'create', 'contract']}>
        <Value name="TYPE">
            <Shadow type={BlockKind.unit_type} />
        </Value>
        <Value name="STORAGE">
            <Shadow type={BlockKind.unit_literal} />
        </Value>
        <Value name="BALANCE">
            <Shadow type={BlockKind.mutez_literal} />
        </Value>
        <Value name="DELEGATE">
            <Shadow type={BlockKind.none_with_type_literal}>
                <Value name="TYPE">
                    <Shadow type={BlockKind.key_hash_type} />
                </Value>
            </Shadow>
        </Value>
        <Value name="ENTRY_POINTS">
            <Entrypoint />
        </Value>
    </Block>
);
