import type { VariableModel } from 'src/typings/blockly';

/**
 * A context that organizes variables based on their scope and type.
 */
export class ScopeContext {
    scopes: Record<string, Record<string, Record<string, VariableModel>>>;
    scopeOfVariable: Record<string, string>;

    /**
     * @param {!Workspace} workspace The workspace this context belongs to.
     */
    constructor() {
        this.scopes = {};
        this.scopeOfVariable = {};
    }

    /**
     * Clear the scopes. (It is called when cleaning the workspace)
     */
    clear() {
        this.scopes = {};
        this.scopeOfVariable = {};
    }

    /**
     * Add variable to scope
     *
     * @param scope Scope identifier
     * @param variable
     *
     * @returns void
     */
    addVariable(scope: string, variable: VariableModel) {
        this.scopes[scope][variable.type] ||= {};

        const variableID = variable.getId();
        this.scopes[scope][variable.type][variableID] = variable;
        this.scopeOfVariable[variableID] = scope;
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
        const variableID = variable.getId();
        const scope = this.scopeOfVariable[variableID];
        if (this.scopes[scope]?.[variable.type]?.[variableID]) {
            delete this.scopes[scope][variable.type][variableID];
        }
        delete this.scopeOfVariable[variableID];
    }

    /**
     * Create scope
     *
     * @param name Scope identifier
     *
     * @returns void
     */
    createScope(name: string) {
        if (name in this.scopes) {
            throw new Error(`There is already a scope named '${name}'.`);
        }
        this.scopes[name] = {};
    }

    /**
     * Remove scope
     *
     * @param name Scope identifier
     *
     * @returns void
     */
    removeScope(name: string) {
        delete this.scopes[name];
    }

    /**
     * Get scope
     */
    getScope(name: string): Readonly<Record<string, Record<string, VariableModel>>> {
        return this.scopes[name];
    }
}
