import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { AddHours } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.add_hours] = {
    init: function () {
        this.appendValueInput('HOURS').setCheck(['Int', 'Expression']).appendField('Add hours');
        this.appendValueInput('TIMESTAMP').setCheck(['Timescript', 'Expression']).appendField('to timestamp');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Add seconds to timestamp.\n-\n(TTimestamp(), TInt()) => TTimestamp()\n`);

        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.add_hours, {
    toValue: (block: Block) => {
        const timestamp: IExpression<any> = SmartML.toValue(block, 'TIMESTAMP');
        const hours: IExpression<any> = SmartML.toValue(block, 'HOURS');
        return AddHours(timestamp, hours, buildErrorInfo(block));
    },
});
