import type { VariableModel, WorkspaceSvg } from 'src/typings/blockly';

/**
 * A context that organizes variables based on their scope and type.
 */
export class ScopeContext {
    workspace: WorkspaceSvg;
    scopes: Record<string, Record<string, VariableModel[]>>;

    /**
     * @param {!Workspace} workspace The workspace this context belongs to.
     */
    constructor(workspace: WorkspaceSvg) {
        this.scopes = {};

        this.workspace = workspace;
    }

    /**
     * Clear the scopes. (It is called when cleaning the workspace)
     */
    clear() {
        this.scopes = {};
    }

    /**
     * Create scope
     *
     * @param name Scope name
     *
     * @returns void
     */
    createScope(name: string) {
        if (name in this.scopes) {
            throw new Error(`There is already a scope named '${name}'.`);
        }
        this.scopes[name] = {};
        console.error('+ SCOPES', Object.keys(this.scopes));
    }

    /**
     * Remove scope
     *
     * @param name Scope name
     *
     * @returns void
     */
    removeScope(name: string) {
        delete this.scopes[name];
        console.error('- SCOPES', Object.keys(this.scopes));
    }
}
