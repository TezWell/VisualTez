import type { Block, WorkspaceSvg } from 'blockly';
import { LineInfo } from '@tezwell/smartts-sdk/misc/utils';

/**
 * Create a LineInfo instance with the block identifier.
 *
 * The block identifier is later used to present error alerts on the faulty block.
 *
 * @param block
 * @returns Information that identifies the source location.
 */
export const buildErrorInfo = (block: Block) => new LineInfo(`BLOCK__${block.id}`, '1');
/**
 * @param block
 * @returns Information that identifies the source location.
 */
export const buildBlockErrorString = (block: Block) => `(BLOCK__${block.id}, line 1)`;

/**
 * Add error information to the workspace.
 *
 * @param workspace
 * @param error
 * @returns `false` if the block containing the error was found, `true` otherwise
 */
export const updateErrorInfo = (workspace: WorkspaceSvg, error: string): boolean => {
    const regex = new RegExp(/[(]BLOCK__(.*?),\sline\s\d[)]/);
    const blockID = error.match(regex)?.reverse()[0];
    const block = workspace.getBlockById(blockID || '');
    if (block) {
        block.setWarningText(error.replace(/[(]BLOCK__(.*?),\sline\s\d[)]/g, ''));
        block.warning?.setVisible(true);

        // Set RED color
        block.warning?.bubble_.setColour('#ff0000');
        block.select();

        const teardDown = () => {
            block.setWarningText(null);
            block.warning?.setVisible(false);
            block.warning?.dispose();

            workspace.svgGroup_.removeEventListener('click', teardDown);
        };
        workspace.svgGroup_.addEventListener('click', teardDown);

        return false;
    }
    return true;
};
