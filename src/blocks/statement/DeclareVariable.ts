import Blockly from 'blockly';
import { NewVariable } from '@tezwell/smartts-sdk/statement';

import type { Block } from 'src/typings/blockly';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';
import { extractVariableName } from '../utils/variables';
import { buildErrorInfo } from '../utils/errorHandling';
import { findVarName } from '../utils/namespace';
import { FieldVariableSetter } from 'src/components/blockly/FieldVariableSetter';
import { VariableKind } from '../core/context';

Blockly.Blocks[BlockKind.variable_declaration_block] = {
    renameVar: function (oldName: string) {
        if (!this.oldName) {
            const current = this.getFieldValue('NAME');
            this.oldName = oldName !== 'var_1' ? oldName : current;
        } else {
            this.oldName = oldName;
        }
        return this.oldName;
    },
    init: function () {
        const initName = findVarName('var', this.workspace);
        const variableField = new FieldVariableSetter(
            initName,
            this.renameVar,
            [VariableKind.Local],
            VariableKind.Local,
        );

        this.appendDummyInput().appendField('Create variable').appendField(variableField, 'VAR');

        this.appendValueInput('VALUE').setCheck(['Expression', 'Literal']).appendField('with value');

        this.setTooltip(`Declares a local variable.`);
        this.setColour(20);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.variable_declaration_block, {
    toStatement: (block: Block) => {
        const variableName = extractVariableName(block, 'VAR');
        const value = SmartML.toValue(block, 'VALUE');
        return NewVariable(variableName, value, true, buildErrorInfo(block));
    },
});
