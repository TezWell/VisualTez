import Blockly from 'blockly';

import type { VisualTezWorkspace } from './workspace';

export class FieldVariableSetter extends (Blockly.FieldVariable as any) {
    private scope = '';
    workspace: VisualTezWorkspace | null = null;

    constructor(
        varName: string | null,
        opt_validator?: any,
        opt_variableTypes?: Array<string> | undefined,
        opt_defaultType?: string | undefined,
        opt_config?: any,
    ) {
        super(varName, opt_validator, opt_variableTypes, opt_defaultType, opt_config);

        /**
         * @override
         */
        this.menuGenerator_ = this.dropdownCreate;
        this.setTypes_(opt_variableTypes, opt_defaultType);

        if (opt_config && 'scope' in opt_config) {
            this.scope = opt_config['scope'];
        }
    }

    /**
     * @override
     */
    initModel() {
        if (!this.variable_) {
            const variable = Blockly.Variables.getOrCreateVariablePackage(
                this.sourceBlock_.workspace,
                null,
                this.defaultVariableName,
                this.defaultType_,
            );

            // Don't call setValue because we don't want to cause a rerender.
            this.doValueUpdate_(variable.getId());
        }
        this.addVariableToScope();
    }

    /**
     * @override
     */
    dispose() {
        if (this.workspace) {
            this.workspace.removeVariable(this.variable_);
        }
        super.dispose();
    }

    addVariableToScope() {
        if (!this.sourceBlock_.isInFlyout) {
            this.workspace = this.sourceBlock_.workspace;
            this.sourceBlock_.workspace.addVariable(this.sourceBlock_, this.variable_);
        }
    }

    dropdownCreate() {
        if (!this.variable_) {
            throw Error('Tried to call dropdownCreate on a variable field with no' + ' variable selected.');
        }
        const name = this.getText();

        const options = [];
        options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]);
        if (Blockly.Msg['DELETE_VARIABLE']) {
            options.push([Blockly.Msg['DELETE_VARIABLE'].replace('%1', name), Blockly.DELETE_VARIABLE_ID]);
        }

        return options;
    }
}

Blockly.fieldRegistry.register('field_variable_setter', FieldVariableSetter);
