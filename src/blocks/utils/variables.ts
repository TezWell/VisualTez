import type { Block } from 'src/typings/blockly';

export const extractVariableName = (block: Block, fieldName: string) => {
    // Blockly Typescript support is terrible
    return (block.getField(fieldName) as any).getVariable().name;
};
