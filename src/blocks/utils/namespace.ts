import { Block, Workspace } from 'blockly';
import BlockKind from '../enums/BlockKind';

const filterByBlockType =
    (blockKind: BlockKind) =>
    ({ type }: Block) =>
        blockKind === type ? true : false;

export const findName = function (name: string, workspace: Workspace, blockKind?: BlockKind) {
    let blocks = workspace.getTopBlocks(false);
    if (blockKind) {
        blocks = blocks.filter(filterByBlockType(blockKind));
    }
    const blockNames = blocks.map((block) => block.getFieldValue('NAME'));

    // The "blockIndex" is used as postfix in the block name.
    // It increments until no collision exist.
    let blockIndex = blocks.length;
    let blockName = `${name}_${blockIndex}`;
    while (blockNames.includes(blockName)) {
        blockName = `${name}_${++blockIndex}`;
    }

    return blockName;
};

export const findVarName = function (name: string, workspace: Workspace) {
    const varNames = workspace.getAllVariableNames();

    // The "index" is used as postfix in the new name.
    // It increments until no collision exist.
    let index = 1;
    let newName = `${name}_${index}`;
    while (varNames.includes(newName)) {
        newName = `${name}_${++index}`;
    }

    return newName;
};
