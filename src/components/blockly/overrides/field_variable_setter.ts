import Blockly from 'blockly';

import type { VisualTezWorkspace } from './workspace';

export class FieldVariableSetter extends (Blockly.FieldVariable as any) {
    workspace: VisualTezWorkspace | null = null;
    disabledDropdown = false;

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

        this.disabledDropdown = !!opt_config?.disabledDropdown;
    }

    /**
     * @link https://github.com/google/blockly/blob/master/core/field_dropdown.js
     * @override
     */
    showEditor_(opt_e: any) {
        if (!this.disabledDropdown) {
            super.showEditor_(opt_e);
        }
    }

    /**
     * @link https://github.com/google/blockly/blob/master/core/field_dropdown.js
     * @override
     */
    initView() {
        if (this.shouldAddBorderRect_()) {
            this.createBorderRect_();
        } else {
            this.clickTarget_ = this.sourceBlock_.getSvgRoot();
        }
        this.createTextElement_();

        this.imageElement_ = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.IMAGE, {}, this.fieldGroup_);
        if (!this.disabledDropdown) {
            if (this.getConstants().FIELD_DROPDOWN_SVG_ARROW) {
                this.createSVGArrow_();
            } else {
                this.createTextArrow_();
            }
        }

        if (this.borderRect_) {
            Blockly.utils.dom.addClass(this.borderRect_, 'blocklyDropdownRect');
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

    onItemSelected_(menu: any, menuItem: any) {
        const id = menuItem.getValue();
        // Handle special cases.
        if (this.sourceBlock_ && this.sourceBlock_.workspace) {
            if (id === Blockly.RENAME_VARIABLE_ID) {
                // Rename variable.
                Blockly.Variables.renameVariable(
                    this.sourceBlock_.workspace,
                    /** @type {!VariableModel} */ this.variable_,
                );
                return;
            } else if (id === Blockly.DELETE_VARIABLE_ID) {
                // Delete variable.
                this.sourceBlock_.workspace.deleteVariableById(this.variable_.getId());
                return;
            } else if (id === 'NEW_VARIABLE') {
                Blockly.Variables.createVariableButtonHandler(
                    this.sourceBlock_.workspace,
                    (varName: string) => {
                        if (varName) {
                            // Update field with the new variable
                            const variable = this.sourceBlock_.workspace.getVariable(varName, this.defaultType_);
                            this.doValueUpdate_(variable.getId());
                            this.addVariableToScope();
                        }
                    },
                    this.defaultType_,
                );
            }
        }
        // Handle unspecial case.
        this.setValue(id);
    }

    dropdownCreate() {
        if (!this.variable_) {
            throw Error('Tried to call dropdownCreate on a variable field with no' + ' variable selected.');
        }
        const name = this.getText();

        const options = [];
        options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]);
        options.push([Blockly.Msg['NEW_VARIABLE'], 'NEW_VARIABLE']);
        if (Blockly.Msg['DELETE_VARIABLE']) {
            options.push([Blockly.Msg['DELETE_VARIABLE'].replace('%1', name), Blockly.DELETE_VARIABLE_ID]);
        }

        return options;
    }
}

Blockly.fieldRegistry.register('field_variable_setter', FieldVariableSetter);
