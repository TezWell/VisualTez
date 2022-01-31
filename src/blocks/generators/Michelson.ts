import type { IValue } from '@tezwell/michelson-sdk/typings';
import type { IType } from '@tezwell/michelson-sdk/typings';
import type { Block } from 'blockly';
import Blockly from 'blockly';

import BlockKind from '../enums/BlockKind';

interface IBlock {
    toType?: (block: Block) => IType;
    toMichelson?: (block: Block) => IValue;
}

class Generator extends Blockly.Generator {
    blocks: Map<BlockKind, IBlock> = new Map();

    addBlock(type: BlockKind, block: IBlock) {
        this.blocks.set(type, block);
    }

    /**
     * @description Translate block to a michelson type.
     *
     * @param {Block} block The parent block to generate code for.
     * @param {Block} name The child block name.
     * @return {Michelson_LiteralUnion}
     */
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

    /**
     * @description Translate block to a michelson value.
     *
     * @param {Block} block The parent block to generate code for.
     * @param {Block} name The child block name.
     * @return {Michelson_LiteralUnion}
     */
    toMichelson(block: Block, name: string): IValue {
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
     * @description Generate code for the specified block (and attached blocks).
     *
     * @param {Block} block The block to generate code for.
     * @return {Michelson_LiteralUnion}
     */
    translateValue(block: Block | null): IValue {
        if (this.isInitialized === false) {
            console.warn('Generator init was not called before blockToCode was called.');
        }
        if (!block) {
            throw Error('Unexpected null block when translating to Michelson value.');
        }
        if (!block.isEnabled()) {
            // Skip past this block if it is disabled.
            return this.translateValue(block.getNextBlock());
        }
        if (block.isInsertionMarker()) {
            // Skip past insertion markers.
            return this.translateValue(block.getChildren(false)[0]);
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

    /**
     * @description Generate code for the specified block (and attached blocks).
     *
     * @param {Block} block The block to generate code for.
     * @return {Michelson_LiteralUnion}
     */
    translateType(block: Block | null): IType {
        if (this.isInitialized === false) {
            console.warn('Generator init was not called before blockToCode was called.');
        }
        if (!block) {
            throw Error('Unexpected null block when translating to Michelson type.');
        }
        if (!block.isEnabled()) {
            // Skip past this block if it is disabled.
            return this.translateType(block.getNextBlock());
        }
        if (block.isInsertionMarker()) {
            // Skip past insertion markers.
            return this.translateType(block.getChildren(false)[0]);
        }

        const func = this.blocks.get(block.type as BlockKind)?.toType;
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
