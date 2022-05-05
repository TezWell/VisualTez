import Blockly from 'blockly';
import { ScopeContext } from './scopeContext';

import type { Block, BlocklyWorkspaceSvg, VariableModel } from 'src/typings/blockly';

/**
 * This extends {@class Blockly.WorkspaceSvg} to provide more control over blockly features.
 */
export class VisualTezWorkspace extends (Blockly.WorkspaceSvg as BlocklyWorkspaceSvg) {
    scopeContext: ScopeContext;

    constructor(options: any, opt_blockDragSurface: any, opt_wsDragSurface: any) {
        super(options, opt_blockDragSurface, opt_wsDragSurface);

        this.scopeContext = new ScopeContext();
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
     * Add variable to scope
     *
     * @param scope Scope identifier
     * @param variable
     *
     * @returns void
     */
    addVariable(block: Block, variable: VariableModel) {
        const rootBlock = block.getRootBlock();

        if (rootBlock) {
            this.scopeContext.addVariable(rootBlock.id, variable);
        }
    }

    /**
     * Remove variable from scope
     *
     * @param scope Scope identifier
     * @param variable
     *
     * @returns void
     */
    removeVariable(variable: VariableModel) {
        this.scopeContext.removeVariable(variable);
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

    /**
     * Create a new scope
     *
     * @param block A root block
     *
     * @returns void
     */
    getScope(block: Block) {
        return this.scopeContext.getScope(block.id);
    }
}
