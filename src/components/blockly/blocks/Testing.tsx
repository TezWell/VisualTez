import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from '../Block';

export const Testing_CreateImplicitAccount = () => (
    <Block type={BlockKind.test__create_implicit_account} tags={['test', 'testing', 'wallet']} />
);

export const TestTarget = () => <Block type={BlockKind.test} tags={['test', 'testing']} />;
