import Blockly from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { StringHelpers } from '@tezwell/smartts-sdk/lib';

import type { Block } from 'src/typings/blockly';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.string_starts_with] = {
    init: function () {
        this.appendValueInput('TEXT').setCheck(['String', 'Expression']);
        this.appendValueInput('PREFIX').setCheck(['String', 'Expression']).appendField('starts with');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Check if a string starts with a given prefix.\n-\n
    (TString() starts with TString()) => TBool()\n`),
            this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_starts_with, {
    toValue: (block: Block) => {
        const text: IExpression<any> = SmartML.toValue(block, 'TEXT');
        const prefix: IExpression<any> = SmartML.toValue(block, 'PREFIX');
        return StringHelpers.StartsWith(text, prefix, buildErrorInfo(block));
    },
});
