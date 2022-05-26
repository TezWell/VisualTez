import Blockly from 'blockly';

import type { Workspace } from 'src/typings/blockly';

import BlockKind from 'src/blocks/enums/BlockKind';

/**
 * @description Override "flyoutCategory" method
 *
 * Construct the elements (blocks and button) required by the flyout for the
 * variable category.
 * @param {!Workspace} workspace The workspace containing variables.
 * @return {!Array<!Element>} Array of XML elements.
 * @alias Blockly.Variables.flyoutCategory
 */
const flyoutCategory = function (workspace: Workspace) {
    return flyoutCategoryBlocks(workspace);
};
Blockly.Variables.flyoutCategory = flyoutCategory;

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
    variableGetterBlock.setAttribute('type', BlockKind.variables_get_v2);
    variableGetterBlock.setAttribute('gap', '8');
    variablePlaceholder.appendChild(variableGetterBlock);

    const variables = workspace.getVariablesOfType('');
    if (variables.length) {
        variableGetterBlock.appendChild(Blockly.Variables.generateVariableFieldDom(variables[0]));
    }

    xmlList.push(variableSetterBlock, variableGetterBlock);

    return xmlList;
};
Blockly.Variables.flyoutCategoryBlocks = flyoutCategoryBlocks;
