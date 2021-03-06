import Blockly from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { StringHelpers } from '@tezwell/smartts-sdk/lib';

import type { Block } from 'src/typings/blockly';
import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.string_ends_with] = {
    init: function () {
        this.appendValueInput('TEXT').setCheck(['String', 'Expression']);
        this.appendValueInput('POSTFIX').setCheck(['String', 'Expression']).appendField('ends with');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Check if a string ends with a given postfix.\n-\n
    (TString() ends with TString()) => TBool()\n`),
            this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.string_ends_with, {
    toValue: (block: Block) => {
        const text: IExpression<any> = SmartML.toValue(block, 'TEXT');
        const postfix: IExpression<any> = SmartML.toValue(block, 'POSTFIX');
        return StringHelpers.EndsWith(text, postfix, buildErrorInfo(block));
    },
});
