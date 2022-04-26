import Blockly from 'blockly';

import { BlocklyToolboxCategory } from 'src/typings/blockly';

enum ItemKind {
    CATEGORYICON = 'CATEGORYICON',
}

class VisualTezCategory extends (Blockly.ToolboxCategory as BlocklyToolboxCategory) {
    icon?: SVGSVGElement;

    /**
     * @override
     */
    constructor(categoryDef: any, toolbox: any, opt_parent: any) {
        super(categoryDef, toolbox, opt_parent);

        this.icon = this.createIconDom(categoryDef.contents);
    }

    createIconDom(contents: any[]) {
        const buildContents = (contents: any[]) => {
            return contents.map((content) => {
                const children = buildContents(content.contents || []);
                const element = document.createElementNS('http://www.w3.org/2000/svg', content.kind.toLowerCase());
                Object.keys(content)
                    .filter((prop) => !['kind', 'contents'].includes(prop))
                    .forEach((prop) => {
                        element.setAttribute(prop, content[prop]);
                    });
                element.append(...children);
                return element;
            });
        };

        const iconItem = [...(contents || [])].find(({ kind }: any) => kind === ItemKind.CATEGORYICON);
        if (iconItem) {
            const [svg] = iconItem.contents;
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            Object.keys(svg)
                .filter((prop) => !['kind', 'contents', 'xmlns'].includes(prop))
                .forEach((prop) => {
                    icon.setAttribute(prop, svg[prop]);
                });
            icon.append(...buildContents(svg.contents));
            return icon;
        }
    }

    /** @override */
    createDom_() {
        this.htmlDiv_ = this.createContainer_();
        Blockly.utils.aria.setRole(this.htmlDiv_, Blockly.utils.aria.Role.TREEITEM);
        Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.SELECTED, false);
        Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.LEVEL, this.level_);

        this.rowDiv_ = this.createRowContainer_();
        (this.rowDiv_ as any).style.pointerEvents = 'auto';
        this.htmlDiv_.appendChild(this.rowDiv_);

        this.rowContents_ = this.createRowContentsContainer_();
        (this.rowContents_ as any).style.pointerEvents = 'none';
        this.rowDiv_.appendChild(this.rowContents_);

        // Add icon to the DOM (If provided)
        if (this.icon) {
            this.rowContents_?.appendChild(this.icon);
        }

        this.labelDom_ = this.createLabelDom_(this.name_);
        this.labelDom_.classList.add('font-bold', 'text-lg');
        this.rowContents_.appendChild(this.labelDom_);
        Blockly.utils.aria.setState(
            this.htmlDiv_,
            Blockly.utils.aria.State.LABELLEDBY,
            this.labelDom_.getAttribute('id')!,
        );

        this.addColourBorder_(this.colour_);

        return this.htmlDiv_;
    }

    /** @override */
    addColourBorder_(colour: string) {
        (this.rowDiv_ as any).style.border = '2px solid ' + (colour || '#ddd');
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
    Blockly.ToolboxCategory.registrationName,
    VisualTezCategory,
    true,
);
