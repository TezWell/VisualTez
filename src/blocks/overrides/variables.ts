import type { Workspace } from 'blockly';
import Blockly, { VariableModel, Variables } from 'blockly';

import BlockKind from '../enums/BlockKind';

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

/**
 * @description Override "flyoutCategoryBlocks" method
 *
 * Construct the blocks required by the flyout for the variable category.
 *
 * @param {!Workspace} workspace The workspace containing variables.
 * @return {!Array<!Element>} Array of XML block elements.
 * @alias Blockly.Variables.flyoutCategoryBlocks
 */
const flyoutCategoryBlocks = (workspace: Workspace) => {
    const statementBlocks = [BlockKind.variable_declaration_block, BlockKind.variable_setter_block];
    const persistentVariableTypes = [BlockKind.contract_storage_block, BlockKind.entrypoint_arg_block];
    const variableModelList = workspace.getVariablesOfType('');

    const xmlList: Element[] = [];

    const statements = statementBlocks.map((blockType, index) => {
        const block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', blockType);
        block.setAttribute('gap', index === statementBlocks.length - 1 ? '24' : '8');
        return block;
    });
    xmlList.push(...statements);

    const persistentVariables = persistentVariableTypes.map((blockType, index) => {
        const block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', blockType);
        block.setAttribute('gap', index === persistentVariableTypes.length - 1 ? '24' : '8');
        return block;
    });
    xmlList.push(...persistentVariables);

    // New variables are added to the end of the variableModelList.
    variableModelList.sort(VariableModel.compareByName);
    const dynamicVariables = variableModelList.map((variable) => {
        const block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'variables_get');
        block.setAttribute('gap', '8');
        block.appendChild(Variables.generateVariableFieldDom(variable)!);
        return block;
    });
    xmlList.push(...dynamicVariables);

    return xmlList;
};
Blockly.Variables.flyoutCategoryBlocks = flyoutCategoryBlocks;
