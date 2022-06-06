import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Value from '../../Value';
import { UnitType } from '../types';

export const ImplicitAccountExpression = () => (
    <Block type={BlockKind.implicit_account} tags={['expression', 'contract', 'key hash', 'implicit account']} />
);
export const GetContractExpression = () => (
    <Block type={BlockKind.get_contract} tags={['expression', 'contract', 'adddress', 'entrypoint']}>
        <Value name="ARGUMENT_TYPE">
            <UnitType />
        </Value>
    </Block>
);
export const AddressOfContractExpression = () => (
    <Block type={BlockKind.address_of_contract} tags={['expression', 'contract', 'adddress']} />
);
