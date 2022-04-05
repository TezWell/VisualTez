import { WorkspaceSvg } from 'blockly';
import BlockKind from '../enums/BlockKind';

const WHITELISTED: string[] = [BlockKind.contract_block, BlockKind.type_compilation, BlockKind.value_compilation];

/**
 * Validate block location and notify users about misplaced blocks.
 *
 * @param workspace
 * @param blockID
 *
 * @returns void
 */
export const validateBlockLocation = (workspace: WorkspaceSvg, blockID: string): void => {
    const block = workspace.getBlockById(blockID);
    if (block) {
        if (block.getParent() || WHITELISTED.includes(block.type)) {
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
