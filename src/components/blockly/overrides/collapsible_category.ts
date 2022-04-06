import Blockly from 'blockly';

class VisualTezCollapsibleToolboxCategory extends Blockly.CollapsibleToolboxCategory {
    /** @override */
    addColourBorder_(colour: string) {
        (this.rowDiv_ as any).style.border = '2px solid ' + 'currentColor';
        (this.rowDiv_ as any).style.background = colour || '#ddd';
    }

    /** @override */
    createDom_() {
        super.createDom_();
        (this.labelDom_ as any).classList.add('font-bold', 'text-lg', 'text-white');

        return this.htmlDiv_;
    }

    /** @override */
    createIconDom_() {
        const toolboxIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        toolboxIcon.setAttribute('viewBox', '0 0 24 24');
        toolboxIcon.setAttribute('fill', 'none');
        toolboxIcon.setAttribute('stroke', 'currentColor');
        toolboxIcon.setAttribute('stroke-width', '4');
        Blockly.utils.dom.addClass(toolboxIcon, 'h-6 w-6 mr-2 text-white');
        toolboxIcon.style.display = 'inline-block';
        return toolboxIcon as any;
    }

    /** @override */
    openIcon_(iconDiv: any) {
        if (!iconDiv) {
            return;
        }
        iconDiv.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        `;
    }

    /** @override */
    closeIcon_(iconDiv: any) {
        if (!iconDiv) {
            return;
        }
        iconDiv.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        `;
    }

    /** @override */
    setSelected(isSelected: boolean) {
        if (isSelected) {
            this.rowDiv_?.classList.add('ring-4');
        } else {
            this.rowDiv_?.classList.remove('ring-4');
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(this.htmlDiv_!, Blockly.utils.aria.State.SELECTED, isSelected);
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.CollapsibleToolboxCategory.registrationName,
    VisualTezCollapsibleToolboxCategory,
    true,
);
