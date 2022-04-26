import type { Block } from 'src/typings/blockly';
import Blockly from 'blockly';
import { For } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { extractVariableName } from '../utils/variables';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';

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
            check: ['Expression', 'Literal'],
        },
        {
            type: 'input_value',
            name: 'TO',
            check: ['Expression', 'Literal'],
            align: 'RIGHT',
        },
        {
            type: 'input_value',
            name: 'BY',
            check: ['Expression', 'Literal'],
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
    colour: 180,
};

Blockly.Blocks[BlockKind.for_block] = {
    init: function () {
        this.jsonInit(ForBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.for_block, {
    toStatement: (block: Block) => {
        const iteratorName = extractVariableName(block, 'VAR');

        const from = SmartML.toValue(block, 'FROM');
        const to = SmartML.toValue(block, 'TO');
        const step = SmartML.toValue(block, 'BY');

        // Add a (For) scope
        Context.contract.enterScope({
            kind: ScopeKind.For,
            variables: {
                [iteratorName]: {
                    kind: VariableKind.Local,
                    name: iteratorName,
                },
            },
        });

        const instructions = SmartML.toStatements(block, 'DO', true);

        return For(from, to, step, [], undefined, buildErrorInfo(block))
            .setIteratorName(iteratorName)
            .Do(() => instructions);
    },
});
