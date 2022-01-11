import { Michelson_LiteralUnion } from '@tezwell/michelson-sdk/core/literal';
import { Michelson_Type } from '@tezwell/michelson-sdk/core/type';
import type { Block } from 'blockly';
import Blockly from 'blockly';

import BlockKind from '../enums/BlockKind';

interface IBlock {
    toType?: (block: Block) => Michelson_Type;
    toMichelson?: (block: Block) => Michelson_LiteralUnion;
}

class Generator extends Blockly.Generator {
    blocks: Map<BlockKind, IBlock> = new Map();

    addBlock(type: BlockKind, block: IBlock) {
        this.blocks.set(type, block);
    }

    toType(block: Block, name: string) {
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

    toMichelson(block: Block, name: string) {
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
        if (localBlock?.toMichelson) {
            return localBlock.toMichelson(targetBlock);
        }

        throw TypeError(`The target block ${targetBlock.type} does not have a michelson generator.`);
    }

    /**
     * Generate code for the specified block (and attached blocks).
     * The generator must be initialized before calling this function.
     * @param {Block} block The block to generate code for.
     * @param {boolean=} opt_thisOnly True to generate code for only this statement.
     * @return {string|!Array} For statement blocks, the generated code.
     *     For value blocks, an array containing the generated code and an
     *     operator order value.  Returns '' if block is null.
     */
    translate(block: Block | null): Michelson_LiteralUnion {
        if (this.isInitialized === false) {
            console.warn('Generator init was not called before blockToCode was called.');
        }
        if (!block) {
            throw Error('@TODO');
        }
        if (!block.isEnabled()) {
            // Skip past this block if it is disabled.
            return this.translate(block.getNextBlock());
        }
        if (block.isInsertionMarker()) {
            // Skip past insertion markers.
            return this.translate(block.getChildren(false)[0]);
        }

        const func = this.blocks.get(block.type as BlockKind)?.toMichelson;
        if (typeof func !== 'function') {
            throw Error(
                'Language "' +
                    this.name_ +
                    '" does not know how to generate ' +
                    'code for block type "' +
                    block.type +
                    '".',
            );
        }
        return func.call(block, block);
    }
}

const Michelson = new Generator('Michelson');

export default Michelson;
