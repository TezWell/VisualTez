import Blockly from 'blockly';
import { VariableModel } from 'src/typings/blockly';

export class FieldVariableGetter extends (Blockly.FieldVariable as any) {
    private defaultOptions: [string, string][] = [];

    constructor(opt_validator: any, opt_variableTypes: Array<string> | undefined, opt_config?: any) {
        super(null, opt_validator, opt_variableTypes, opt_variableTypes?.[0] || '', opt_config);

        /**
         * @override
         */
        this.menuGenerator_ = this.dropdownCreate;

        if (opt_config) {
            if ('default_options' in opt_config && Array.isArray(opt_config['default_options'])) {
                this.defaultOptions = opt_config['default_options'];
            }
        }

        this.setTypes_(opt_variableTypes, opt_variableTypes?.[0] || '');
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
        return (this.variable_ ? this.variable_.name : this.selectedOption_?.[0]) || '';
    }

    /**
     * Return a list of the options for this dropdown.
     * @param {boolean=} opt_useCache For dynamic options, whether or not to use
     *     the cached options or to re-generate them.
     * @return {!Array<!Array>} A non-empty array of option tuples:
     *     (human-readable text or image, language-neutral name).
     * @throws {TypeError} If generated options are incorrectly structured.
     *
     * @override
     */
    getOptions() {
        return (this.generatedOptions_ = this.dropdownCreate());
    }

    /**
     * Return a sorted list of variable names to be populated in the variable dropdown menu.
     */
    dropdownCreate() {
        // The methods bellow can be used to access the block parents
        // this.sourceBlock_.getSurroundParent();
        // this.sourceBlock_.getRootBlock();
        const rootBlock = this.sourceBlock_.getRootBlock();
        const variableTypes = this.getVariableTypes_();
        let variableModelList: VariableModel[] = [];

        if (rootBlock) {
            const variablesPerType = this.sourceBlock_.workspace.getScope(rootBlock);
            if (variablesPerType) {
                variableTypes.forEach((variableType: string) => {
                    const variablesOfType = variablesPerType[variableType];
                    if (variablesOfType) {
                        variableModelList = [...variableModelList, ...(Object.values(variablesOfType) as any)];
                    }
                });
            }
        }
        variableModelList.sort(Blockly.VariableModel.compareByName);

        const options = [...this.defaultOptions];
        variableModelList.forEach((variable) => {
            options.push([variable.name, variable.getId()]);
        });

        return options;
    }
}

Blockly.fieldRegistry.register('field_variable_getter', FieldVariableGetter);
