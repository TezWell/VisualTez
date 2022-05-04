import Blockly from 'blockly';
import BlockKind from 'src/blocks/enums/BlockKind';
import { Block } from 'src/typings/blockly';

export class CompilationSelection extends (Blockly.FieldDropdown as any) {
    constructor() {
        super(Blockly.Field.SKIP_SETUP);
    }

    /**
     * @override
     */
    doClassValidation_(opt_newValue: any) {
        return /** @type {string} */ opt_newValue;
    }

    getOptions() {
        return (this.generatedOptions_ = this.dropdownCreate());
    }

    dropdownCreate() {
        const options = (this.sourceBlock_.workspace.getTopBlocks() || [])
            .filter(({ type }: Block) => type === BlockKind.contract_block)
            .map((block: Block) => {
                const name = block.getFieldValue('NAME');
                return [name, name];
            });

        return options;
    }
}

Blockly.fieldRegistry.register('compilation_selection', CompilationSelection);
