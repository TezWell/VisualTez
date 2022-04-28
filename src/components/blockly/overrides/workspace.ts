import Blockly from 'blockly';
import { ScopeContext } from './scopeContext';

import type { Block, BlocklyWorkspaceSvg } from 'src/typings/blockly';

/**
 * This extends {@class Blockly.WorkspaceSvg} to provide more control over blockly features.
 */
export class VisualTezWorkspace extends (Blockly.WorkspaceSvg as BlocklyWorkspaceSvg) {
    scopeContext: ScopeContext;

    constructor(options: any, opt_blockDragSurface: any, opt_wsDragSurface: any) {
        super(options, opt_blockDragSurface, opt_wsDragSurface);

        this.scopeContext = new ScopeContext(this);
    }

    /**
     * Dispose of all blocks and comments in workspace.
     * @override
     */
    clear() {
        super.clear();
        this.scopeContext.clear();
    }

    /**
     * Create a new scope
     *
     * @param block A root block
     *
     * @returns void
     */
    createScope(block: Block) {
        return this.scopeContext.createScope(block.id);
    }

    /**
     * Create a new scope
     *
     * @param block A root block
     *
     * @returns void
     */
    removeScope(block: Block) {
        return this.scopeContext.removeScope(block.id);
    }
}
