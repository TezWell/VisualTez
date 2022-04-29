import type { Block } from 'src/typings/blockly';

import { buildBlockErrorString } from './errorHandling';

export const extractVariableName = (block: Block, fieldName: string) => {
    const field = block.getField(fieldName);
    if (!field) {
        throw new Error(
            `Block (${block.type}) does not have any field named '${fieldName}'. ${buildBlockErrorString(block)}`,
        );
    }
    return field.getText();
};
