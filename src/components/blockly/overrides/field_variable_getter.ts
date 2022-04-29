import Blockly from 'blockly';
import { VariableModel } from 'src/typings/blockly';

export class FieldVariableGetter extends (Blockly.FieldVariable as any) {
    private defaultOptions: [string, string][] = [];

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

        if (opt_config) {
            if ('default_options' in opt_config && Array.isArray(opt_config['default_options'])) {
                this.defaultOptions = opt_config['default_options'];
            }
        }

        this.setTypes_(opt_variableTypes, opt_defaultType);
    }

    /**
     * @override
     */
    initModel() {
        // Do nothing here
    }

    /**
     * @override
     */
    fromXml(fieldElement: Element) {
        const id = fieldElement.getAttribute('id');
        const variableType =
            fieldElement.getAttribute('variabletype') || fieldElement.getAttribute('variableType') || '';

        const variable = Blockly.Variables.getVariable(this.sourceBlock_.workspace, id);

        // This should never happen :)
        if (variable && variableType !== null && variableType !== variable.type) {
            throw Error(
                "Serialized variable type with id '" +
                    variable.getId() +
                    "' had type " +
                    variable.type +
                    ', and ' +
                    'does not match variable field that references it: ' +
                    Blockly.Xml.domToText(fieldElement) +
                    '.',
            );
        }

        this.setValue(id);
    }

    /**
     * @override
     */
    toXml(fieldElement: Element) {
        // Make sure the variable is initialized.
        this.initModel();

        // Add variable information
        if (this.variable_) {
            fieldElement.id = this.variable_.getId();
            fieldElement.textContent = this.variable_.name;
            if (this.variable_.type) {
                fieldElement.setAttribute('variabletype', this.variable_.type);
            }
        } else {
            // Explicit variable
            fieldElement.id = this.value_;
            fieldElement.textContent = this.value_;
            fieldElement.setAttribute('variabletype', this.defaultType_);
        }
        return fieldElement;
    }

    /**
     * @override
     */
    loadState(state: any) {
        if (this.loadLegacyState(FieldVariableGetter, state)) {
            return;
        }
        this.setValue(state['id']);
    }

    /**
     * @override
     */
    onItemSelected_(_menu: unknown, menuItem: any) {
        this.setValue(menuItem.getValue());
    }

    /**
     * @override
     */
    doClassValidation_(newId: string) {
        if (newId === null) {
            return null;
        }
        const variable = Blockly.Variables.getVariable(this.sourceBlock_.workspace, newId);
        if (variable) {
            // Type Checks.
            const type = variable.type;
            if (!this.typeIsAllowed_(type)) {
                console.warn("Variable type doesn't match this field!  Type was " + type);
                return null;
            }
        }
        return newId;
    }

    /**
     * Get the variable's ID.
     * @return {?string} Current variable's ID.
     * @override
     */
    getValue() {
        return this.value_;
    }

    /**
     * Get the text from this field, which is the selected variable's name.
     * @return {string} The selected variable's name, or the empty string if no
     *     variable is selected.
     * @override
     */
    getText() {
        return this.selectedOption_?.[0] || '';
    }

    /**
     * Return a sorted list of variable names to be populated in the variable dropdown menu.
     */
    dropdownCreate() {
        // The methods bellow can be used to access the root block
        // this.sourceBlock_.getSurroundParent();
        // this.sourceBlock_.getRootBlock();
        const rootBlock = this.sourceBlock_.getSurroundParent();

        const variableTypes = this.getVariableTypes_();
        let variableModelList: VariableModel[] = [];

        if (rootBlock) {
            const scopeVariables = this.sourceBlock_.workspace.getScope(rootBlock);
            if (scopeVariables) {
                variableTypes.forEach((variableType: string) => {
                    scopeVariables.forEach((variable: VariableModel) => {
                        if (variableType === variable.type) {
                            variableModelList.push(variable);
                        }
                    });
                });
            }
        }
        variableTypes.forEach((variableType: string) => {
            const variables = this.sourceBlock_.workspace.getVariablesOfType(variableType);
            variableModelList = variableModelList.concat(variables);
        });
        variableModelList.sort(Blockly.VariableModel.compareByName);

        const options = [...this.defaultOptions];
        variableModelList.forEach((variable) => {
            options.push([variable.name, variable.getId()]);
        });

        return options;
    }
}

Blockly.fieldRegistry.register('field_variable_getter', FieldVariableGetter);
