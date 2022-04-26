import type { WorkspaceSvg } from 'src/typings/blockly';
import BlockKind from '../enums/BlockKind';

const WHITELISTED: string[] = [
    BlockKind.contract_block,
    BlockKind.type_compilation,
    BlockKind.value_compilation,
    BlockKind.test,
];

/**
 * Validate block location and notify users about misplaced blocks.
 *
 * @param workspace
 * @param blockID
 *
 * @returns void
 */
export const validateBlockLocation = (workspace: WorkspaceSvg, blockID: string): void => {
    const block: any = workspace.getBlockById(blockID);
    if (block && !WHITELISTED.includes(block.type)) {
        if (block.getParent()) {
            block.setEnabled(true);
            block.setWarningText(null);
            block.warning?.dispose();
        } else {
            block.setEnabled(false);
            block.setWarningText('This block is in the wrong place!');
            block.warning?.setVisible(true);

            // Set ORANGE color
            block.warning?.bubble_.setColour('#ffa500');
        }
    }
};
