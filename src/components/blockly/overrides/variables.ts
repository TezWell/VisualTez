import type { Workspace } from 'blockly';
import Blockly, { Variables } from 'blockly';

import BlockKind from 'src/blocks/enums/BlockKind';

//import Variable from '../enums/Variable';
// export const createVariable = (name: string, id: string, type = '') => {
//     Blockly.getMainWorkspace().createVariable(name, type, id);
// };
// export const deleteVariableById = (id: string) => {
//     Blockly.getMainWorkspace().deleteVariableById(id);
// };

// export const initiateDefaultVariables = () => {
//     createVariable('Contract Storage', Variable.contract_storage, '');
//     createVariable('Entrypoint Argument', Variable.entrypoint_arg, '');
// };

Blockly.Blocks[BlockKind.variables_get] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.variables_get,
            message0: 'Get Variable: %1',
            args0: [
                {
                    type: 'field_variable',
                    name: 'VAR',
                    variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
                },
            ],
            output: ['Expression'],
            colour: 80,
            tooltip: 'Access the variable value.',
            extensions: ['contextMenu_variableSetterGetter'],
        });
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

/**
 * Override "flyoutCategoryBlocks" method
 *
 * Construct the blocks required by the flyout for the variable category.
 *
 * @param {!Workspace} workspace The workspace containing variables.
 * @return {!Array<!Element>} Array of XML block elements.
 * @alias Blockly.Variables.flyoutCategoryBlocks
 */
const flyoutCategoryBlocks = (workspace: Workspace) => {
    const statementBlocks = [BlockKind.variable_declaration_block];
    const persistentVariableTypes = [BlockKind.contract_storage_block];

    const xmlList: Element[] = [];

    const statements = statementBlocks.map((blockType, index) => {
        const block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', blockType);
        block.setAttribute('gap', index === statementBlocks.length - 1 ? '24' : '8');

        return block;
    });
    xmlList.push(...statements);

    const variableSetterBlock = Blockly.utils.xml.createElement('block');
    variableSetterBlock.setAttribute('type', BlockKind.variable_setter_block);
    const variablePlaceholder = Blockly.utils.xml.createElement('value');
    variablePlaceholder.setAttribute('name', 'VAR');
    variableSetterBlock.appendChild(variablePlaceholder);
    const variableGetterBlock = Blockly.utils.xml.createElement('block');
    variableGetterBlock.setAttribute('type', BlockKind.variables_get);
    variableGetterBlock.setAttribute('gap', '8');
    variablePlaceholder.appendChild(variableGetterBlock);

    const variables = workspace.getVariablesOfType('');
    if (variables.length) {
        variableGetterBlock.appendChild(Variables.generateVariableFieldDom(variables[0])!);
    }

    xmlList.push(variableSetterBlock, variableGetterBlock);

    const persistentVariables = persistentVariableTypes.map((blockType, index) => {
        const block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', blockType);
        block.setAttribute('gap', index === persistentVariableTypes.length - 1 ? '24' : '8');
        return block;
    });

    xmlList.push(...persistentVariables);
    return xmlList;
};
Blockly.Variables.flyoutCategoryBlocks = flyoutCategoryBlocks;
