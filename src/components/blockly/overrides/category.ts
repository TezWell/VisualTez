import Blockly from 'blockly';

class VisualTezCategory extends Blockly.ToolboxCategory {
    /**
     * Constructor for a custom category.
     * @override
     */
    constructor(categoryDef: any, toolbox: any, opt_parent: any) {
        super(categoryDef, toolbox, opt_parent);
    }

    /** @override */
    addColourBorder_(colour: string) {
        const self = this as any;
        self.rowDiv_.style.backgroundColor = colour;
    }

    /** @override */
    setSelected(isSelected: boolean) {
        const self = this as any;
        // We do not store the label span on the category, so use getElementsByClassName.
        const labelDom = self.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            // Change the background color of the div to white.
            self.rowDiv_.style.backgroundColor = 'white';
            // Set the colour of the text to the colour of the category.
            labelDom.style.color = this.colour_;
        } else {
            // Set the background back to the original colour.
            self.rowDiv_.style.backgroundColor = this.colour_;
            // Set the text back to white.
            labelDom.style.color = 'white';
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(
            /** @type {!Element} */ self.htmlDiv_,
            Blockly.utils.aria.State.SELECTED,
            isSelected,
        );
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    VisualTezCategory,
    true,
);
