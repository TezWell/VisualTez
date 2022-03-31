import Blockly from 'blockly';

class ToolboxSearch extends Blockly.ToolboxCategory {
    private input?: HTMLInputElement;
    private button?: HTMLButtonElement;

    constructor(toolboxItemDef: any, toolbox: any, opt_parent: any) {
        super(toolboxItemDef, toolbox, opt_parent);
    }

    isSelected() {
        return Boolean((this.htmlDiv_ as HTMLDivElement).ariaSelected);
    }

    /** @override */
    init() {
        this.createDom_();
        if (this.toolboxItemDef_['hidden'] === 'true') {
            this.hide();
        }
    }

    /** @override */
    createDom_() {
        this.htmlDiv_ = this.createContainer_();
        Blockly.utils.aria.setRole(this.htmlDiv_, Blockly.utils.aria.Role.TREEITEM);
        Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.SELECTED, false);
        Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.LEVEL, this.level_);

        // Create search element.
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Search...';
        this.input.className =
            'w-48 focus:ring-0 font-mono text-black rounded-l-md border-0 border-b-4 border-yellow-700 focus:border-yellow-500';

        this.input.onkeydown = async () => {
            await new Promise((r) => setTimeout(r, 200));
            if (this.input?.value) {
                (this.parentToolbox_ as any).flyout_.show(this.getContents());
            } else {
                (this.parentToolbox_ as any).flyout_.hide();
            }
        };
        // Create button
        this.button = document.createElement('button');
        this.button.className =
            'flex-1 flex items-center justify-center w-12 font-bold text-black dark:text-white border-b-4 rounded-r-md bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500';
        this.button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="block h-5 w-5 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
        `;

        this.htmlDiv_.append(this.input, this.button);

        return this.htmlDiv_;
    }

    /** @override */
    isSelectable() {
        return true;
    }

    /** @override */
    setSelected(isSelected: boolean) {
        if (this.htmlDiv_) {
            Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.SELECTED, isSelected);
        }
    }

    /** @override */
    createContainer_() {
        const container = document.createElement('div');
        Blockly.utils.dom.addClass(container, 'inline-flex mb-2');
        return container;
    }

    /** @override */
    getClickTarget() {
        return this.button!;
    }

    /** @override */
    getDiv() {
        return this.htmlDiv_ as Element;
    }

    /** @override */
    getContents() {
        const query = this.input?.value || '';
        const filter = (block: { tags: string }) => {
            const tags = block.tags?.split(',') || [];
            return tags.some((tag) => tag.toLowerCase().startsWith(query.toLowerCase()));
        };
        return this.flyoutItems_.filter(filter);
    }
}

Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, 'toolboxsearch', ToolboxSearch);
