import { Expression } from '@tezwell/smartts-sdk/core/expression';
import Blockly from 'blockly/core';

class Generator extends Blockly.Generator {
    blocks: Record<string, any> = {};

    toType(block: any, name: string) {
        const targetBlock = block.getInputTargetBlock(name);
        if (!targetBlock) {
            return '';
        }
        if (!this.blocks[targetBlock.type]?.toType) {
            throw TypeError(`The target block ${targetBlock.type} does not have a type generator.`);
        }
        return this.blocks[targetBlock.type].toType(targetBlock);
    }

    toValue(block: any, name: string) {
        console.error(block.getInputTargetBlock(name), name);
        const targetBlock = block.getInputTargetBlock(name);
        if (!targetBlock) {
            return '';
        }
        if (!this.blocks[targetBlock.type]?.toValue) {
            throw TypeError(`The target block ${targetBlock.type} does not have a value generator.`);
        }

        console.error(targetBlock, name);
        return this.blocks[targetBlock.type].toValue(targetBlock);
    }

    toStatement(block: any): Expression[] {
        if (!block) {
            return [];
        }
        if (!this.blocks[block.type]?.toStatement) {
            throw TypeError(`The target block ${block.type} does not have a statement generator.`);
        }
        const statement = this.blocks[block.type].toStatement(block);
        return [statement, ...this.toStatement(block.getNextBlock())];
    }

    statementToCode(block: any, name: string): Expression[] {
        const targetBlock = block.getInputTargetBlock(name);
        return this.toStatement(targetBlock);
    }

    // https://github.com/google/blockly/blob/02a57122debaa4ca043312dec547944afae658c4/core/generator.js
}

const SmartML = new (Generator as any)('SmartML');

export default SmartML;
