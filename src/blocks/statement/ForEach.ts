import type { Block } from 'src/typings/blockly';
import Blockly from 'blockly';
import { ForEachOf } from '@tezwell/smartts-sdk/statement';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { extractVariableName } from '../utils/variables';
import { buildErrorInfo } from '../utils/errorHandling';
import { findVarName } from '../utils/namespace';
import { FieldVariableSetter } from 'src/components/blockly/overrides/field_variable_setter';

Blockly.Blocks[BlockKind.for_each_block] = {
    renameVar: function (oldName: string) {
        if (!this.oldName) {
            const current = this.getFieldValue('VAR');
            this.oldName = oldName !== 'iter_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findVarName('iter', this.workspace);
        const variableField = new FieldVariableSetter(
            initName,
            this.renameVar,
            [VariableKind.Iterator],
            VariableKind.Iterator,
        );

        this.appendDummyInput().appendField('For each').appendField(variableField, 'VAR');
        this.appendValueInput('LIST').setCheck(['Expression', 'List']).appendField('of list');

        this.appendStatementInput('DO').setCheck(['Statement']).appendField('Do');

        this.setColour(180);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.for_each_block, {
    toStatement: (block: Block) => {
        const list = SmartML.toValue(block, 'LIST');

        const iteratorName = extractVariableName(block, 'VAR');

        // Add a (For) scope
        Context.contract.enterScope({
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
        Context.contract.exitScope();

        return ForEachOf(list, [], undefined, buildErrorInfo(block))
            .setIteratorName(iteratorName)
            .Do(() => instructions);
    },
});
