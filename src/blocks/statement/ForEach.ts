import { Block } from 'blockly';
import Blockly from 'blockly';
import { ForEachOf } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { buildErrorInfo } from '../utils/errorHandling';

const ForEachBlock = {
    type: BlockKind.for_each_block,
    message0: 'For each %1 of list %2',
    args0: [
        {
            type: 'field_variable',
            name: 'VAR',
            variable: null,
        },
        {
            type: 'input_value',
            name: 'LIST',
            check: ['Expression', 'List'],
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
    previousStatement: null,
    nextStatement: null,
    colour: 180,
    helpUrl: '%{BKY_CONTROLS_FOREACH_HELPURL}',
    extensions: ['contextMenu_newGetVariableBlock', 'controls_forEach_tooltip'],
};

Blockly.Blocks[BlockKind.for_each_block] = {
    init: function () {
        this.jsonInit(ForEachBlock);
    },
};

SmartML.addBlock(BlockKind.for_each_block, {
    toStatement: (block: Block) => {
        const list = SmartML.toValue(block, 'LIST');

        const iteratorName = extractVariableName(block, 'VAR');

        // Add a (For) scope
        Context.main.enterScope({
            kind: ScopeKind.For,
            variables: {
                [iteratorName]: {
                    kind: VariableKind.Iterator,
                    name: iteratorName,
                },
            },
        });

        const instructions = SmartML.toStatements(block, 'DO', true);

        // Remove current scope
        Context.main.exitScope();

        return ForEachOf(list, [], undefined, buildErrorInfo(block))
            .setIteratorName(iteratorName)
            .Do(() => instructions);
    },
});
