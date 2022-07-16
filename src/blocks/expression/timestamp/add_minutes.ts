import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { AddMinutes } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.add_minutes] = {
    init: function () {
        this.appendValueInput('MINUTES').setCheck(['Int', 'Expression']).appendField('Add minutes');
        this.appendValueInput('TIMESTAMP').setCheck(['Timescript', 'Expression']).appendField('to timestamp');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Add seconds to timestamp.\n-\n(TTimestamp(), TInt()) => TTimestamp()\n`);

        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.add_minutes, {
    toValue: (block: Block) => {
        const timestamp: IExpression<any> = SmartML.toValue(block, 'TIMESTAMP');
        const minutes: IExpression<any> = SmartML.toValue(block, 'MINUTES');
        return AddMinutes(timestamp, minutes, buildErrorInfo(block));
    },
});
