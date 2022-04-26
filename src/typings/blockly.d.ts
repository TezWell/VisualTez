/**
 * @TODO Rodrigo Quelhas
 *
 * This file is temporary
 *
 * Blockly v8.0.0 exports typescript typings incorrectly
 * @see https://github.com/google/blockly/issues/6075
 */

import Blockly from 'core/blockly';

export type BlocklyGenerator = typeof Blockly.Generator;
export type BlocklyToolboxCategory = typeof Blockly.ToolboxCategory;
export type BlocklyCollapsibleToolboxCategory = typeof Blockly.CollapsibleToolboxCategory;

export * from 'core/blockly';
export * from 'core/toolbox/category';
