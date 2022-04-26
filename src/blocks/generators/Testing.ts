import { IAction } from '@tezwell/tezos-testing-sdk/action';
import Blockly from 'blockly';

import type { Block, BlocklyGenerator } from 'src/typings/blockly';

import BlockKind from '../enums/BlockKind';
import { buildBlockErrorString } from '../utils/errorHandling';

interface IBlock {
    toAction?: (block: Block) => IAction;
}

class Generator extends (Blockly.Generator as BlocklyGenerator) {
    blocks: Map<BlockKind, IBlock> = new Map();

    addBlock(type: BlockKind, block: IBlock) {
        this.blocks.set(type, block);
    }

    /**
     * @description Translate block to a testing action.
     *
     * @param {Block} block The parent block to generate code for.
     * @param {Block} name The child block name.
     * @return {Michelson_LiteralUnion}
     */
    toAction(block: Block, name: string): IAction {
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

            throw TypeError(`Could not find "${targetBlockName}" in "${blockName}". ${buildBlockErrorString(block)}`);
        }

        const localBlock = this.blocks.get(targetBlock.type as BlockKind);
        if (localBlock?.toAction) {
            return localBlock.toAction(targetBlock);
        }

        throw TypeError(
            `The target block ${targetBlock.type} does not have an action generator. ${buildBlockErrorString(
                targetBlock,
            )}`,
        );
    }

    toActions(block: Block, name: string, allow_empty = false) {
        const actions: IAction[] = [];

        let targetBlock = block.getInputTargetBlock(name);
        if (!targetBlock) {
            if (allow_empty) {
                return actions;
            }

            throw new Error(`No statements found on block ${block.type}. ${buildBlockErrorString(block)}`);
        }

        do {
            const localBlock = this.blocks.get(targetBlock.type as BlockKind);
            if (!localBlock?.toAction) {
                throw new Error(
                    `Block ${targetBlock.type} is in the wrong place. ${buildBlockErrorString(targetBlock)}`,
                );
            }
            actions.push(localBlock.toAction(targetBlock));
        } while ((targetBlock = targetBlock.getNextBlock()));

        return actions;
    }
}

const Testing = new Generator('Testing');

export default Testing;
