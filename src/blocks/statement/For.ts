import { Block } from 'blockly';
import Blockly from 'blockly';
import { For } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { extractVariableName } from '../utils/variables';
import Context, { ScopeKind, VariableKind } from '../core/context';

const ForBlock = {
    type: BlockKind.for_block,
    message0: 'Iterate %1 from %2 to %3 by %4',
    args0: [
        {
            type: 'field_variable',
            name: 'VAR',
            variable: null,
        },
        {
            type: 'input_value',
            name: 'FROM',
            check: 'Nat',
        },
        {
            type: 'input_value',
            name: 'TO',
            check: 'Nat',
            align: 'RIGHT',
        },
        {
            type: 'input_value',
            name: 'BY',
            check: 'Nat',
            align: 'RIGHT',
        },
    ],
    message1: '%{BKY_CONTROLS_REPEAT_INPUT_DO} %1',
    args1: [
        {
            type: 'input_statement',
            name: 'DO',
            check: 'Statement',
        },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 180,
};

Blockly.Blocks[BlockKind.for_block] = {
    init: function () {
        this.jsonInit(ForBlock);
    },
};

SmartML.addBlock(BlockKind.for_block, {
    toStatement: (block: Block) => {
        const iteratorName = extractVariableName(block, 'VAR');

        const from = SmartML.toValue(block, 'FROM');
        const to = SmartML.toValue(block, 'TO');
        const step = SmartML.toValue(block, 'BY');

        // Add a (For) scope
        Context.main.enterScope({
            kind: ScopeKind.For,
            variables: {
                [iteratorName]: {
                    kind: VariableKind.Local,
                    name: iteratorName,
                },
            },
        });

        const instructions = SmartML.toStatements(block, 'DO', true);

        return For(from, to, step)
            .setIteratorName(iteratorName)
            .Do(() => instructions);
    },
});
