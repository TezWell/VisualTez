import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { String } from '@tezwell/smartts-sdk/lib';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';

Blockly.Blocks[BlockKind.string_starts_with] = {
    init: function () {
        this.appendValueInput('TEXT').setCheck(['String', 'Expression']).appendField('String');
        this.appendValueInput('PREFIX').setCheck(['String', 'Expression']).appendField('starts with');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);
        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_starts_with, {
    toValue: (block: Block) => {
        const text: IExpression<any> = SmartML.toValue(block, 'TEXT');
        const prefix: IExpression<any> = SmartML.toValue(block, 'PREFIX');
        return String.StartsWith(text, prefix);
    },
});
