import type { Block, Workspace } from 'blockly';
import Blockly from 'blockly';

import BlockKind from '../enums/BlockKind';
import { IType } from '@tezwell/smartts-sdk/typings/type';
import { IToString } from '@tezwell/smartts-sdk/typings/shared';
import { IExpressionKind } from '@tezwell/smartts-sdk/typings/expression';

interface IBlock {
    toType?: (block: Block) => IType;
    toValue?: (block: Block) => IExpressionKind;
    toStatement?: (block: Block) => IToString;
}

class Generator extends Blockly.Generator {
    blocks: Map<BlockKind, IBlock> = new Map();

    addBlock(type: BlockKind, block: IBlock) {
        this.blocks.set(type, block);
    }

    toType(block: Block, name: string): IType {
        const targetBlock = block.getInputTargetBlock(name);
        if (!targetBlock) {
            const blockName = block.type
                .split('_')
                .map((tk) => tk.charAt(0).toUpperCase() + tk.slice(1))
                .join(' ');
            const targetBlockName = name
                .split('_')
                .map((tk) => tk.charAt(0).toUpperCase() + tk.slice(1))
                .join(' ');

            throw TypeError(`Could not find "${targetBlockName}" in "${blockName}".`);
        }

        const localBlock = this.blocks.get(targetBlock.type as BlockKind);
        if (localBlock?.toType) {
            return localBlock.toType(targetBlock);
        }

        throw TypeError(`The target block ${targetBlock.type} does not have a type generator.`);
    }

    toValue(block: Block, name: string) {
        const targetBlock = block.getInputTargetBlock(name);
        if (!targetBlock) {
            const blockName = block.type
                .split('_')
                .map((tk) => tk.charAt(0).toUpperCase() + tk.slice(1))
                .join(' ');
            const targetBlockName = name
                .split('_')
                .map((tk) => tk.charAt(0).toUpperCase() + tk.slice(1))
                .join(' ');

            throw TypeError(`Could not find "${targetBlockName}" in "${blockName}".`);
        }

        const localBlock = this.blocks.get(targetBlock.type as BlockKind);
        if (localBlock?.toValue) {
            return localBlock.toValue(targetBlock);
        }

        throw TypeError(`The target block ${targetBlock.type} does not have a value generator.`);
    }

    toStatement(block: Block, name: string): IToString[] {
        const targetBlock = name ? block.getInputTargetBlock(name) : block;
        if (!targetBlock) {
            return [];
        }

        const localBlock = this.blocks.get(targetBlock.type as BlockKind);
        if (!localBlock?.toStatement) {
            throw TypeError(`The target block ${block.type} does not have a statement generator.`);
        }

        const statements = [localBlock.toStatement(targetBlock)];

        let nextBlock: Block | null;
        while ((nextBlock = targetBlock.getNextBlock())) {
            statements.concat(localBlock.toStatement(nextBlock));
        }

        return statements;
    }

    statementToCode(block: Block, name: string): string {
        const targetBlock = block.getInputTargetBlock(name);

        return '@TODO';
    }

    /**
     * Generate code for all blocks in the workspace to the specified language.
     * @param {Workspace} workspace Workspace to generate code from.
     * @return {string} Generated code.
     */
    workspaceToCode(workspace: Workspace) {
        if (!workspace) {
            // Backwards compatibility from before there could be multiple workspaces.
            console.warn('No workspace specified in workspaceToCode call.  Guessing.');
            workspace = Blockly.common.getMainWorkspace();
        }
        const codeBlocks = [];
        this.init(workspace);
        const blocks = workspace.getTopBlocks(true);
        for (let i = 0, block; (block = blocks[i]); i++) {
            if (block.type !== 'contract_block') {
                console.error(block.type);
                continue;
            }
            let line = this.blockToCode(block);
            if (Array.isArray(line)) {
                // Value blocks return tuples of code and operator order.
                // Top-level blocks don't care about operator order.
                line = line[0];
            }
            if (typeof line === 'string') {
                if (block.outputConnection) {
                    // This block is a naked value.  Ask the language's code generator if
                    // it wants to append a semicolon, or something.
                    line = this.scrubNakedValue(line);
                    if (this.STATEMENT_PREFIX && !block.suppressPrefixSuffix) {
                        line = this.injectId(this.STATEMENT_PREFIX, block) + line;
                    }
                    if (this.STATEMENT_SUFFIX && !block.suppressPrefixSuffix) {
                        line = line + this.injectId(this.STATEMENT_SUFFIX, block);
                    }
                }
                codeBlocks.push(line);
            }
        }
        let code = codeBlocks.join('\n'); // Blank line between each section.
        code = this.finish(code);
        // Final scrubbing of whitespace.
        code = code.replace(/^\s+\n/, '');
        code = code.replace(/\n\s+$/, '\n');
        code = code.replace(/[ \t]+\n/g, '\n');
        return code;
    }

    // https://github.com/google/blockly/blob/02a57122debaa4ca043312dec547944afae658c4/core/generator.js
}

const SmartML: Generator & Record<string, any> = new Generator('SmartML');

export default SmartML;