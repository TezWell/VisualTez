import React from 'react';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import Shadow from '../../Shadow';
import Value from '../../Value';

export const ArithmeticExpression = () => (
    <Block
        type={BlockKind.math_block}
        tags={['expression', 'arithmetic', 'math', 'sum', 'subtract', 'multiply', 'divide']}
    />
);

export const ABSExpression = () => (
    <Block type={BlockKind.abs_expression} tags={['expression', 'arithmetic', 'math', 'abs']}>
        <Value name="VALUE">
            <Shadow type={BlockKind.int_literal} />
        </Value>
    </Block>
);

export const NegateExpression = () => (
    <Block type={BlockKind.negate_expression} tags={['expression', 'arithmetic', 'math', 'negate']}>
        <Value name="VALUE">
            <Shadow type={BlockKind.nat_literal} />
        </Value>
    </Block>
);

export const ModExpression = () => (
    <Block type={BlockKind.mod_expression} tags={['expression', 'arithmetic', 'remainder', 'division', 'mod']} />
);

export const EdivExpression = () => (
    <Block type={BlockKind.ediv_expression} tags={['expression', 'arithmetic', 'divide', 'division', 'euclidean']} />
);

export const ShiftLeftExpression = () => (
    <Block type={BlockKind.shift_left_expression} tags={['expression', 'arithmetic', 'shift']} />
);

export const ShiftRightExpression = () => (
    <Block type={BlockKind.shift_right_expression} tags={['expression', 'arithmetic', 'shift']} />
);
