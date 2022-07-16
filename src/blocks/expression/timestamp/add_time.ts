import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { AddHours, AddMinutes, AddSeconds } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.add_time] = {
    init: function () {
        const dropDown = new Blockly.FieldDropdown([
            ['seconds', 'SECONDS'],
            ['minutes', 'MINUTES'],
            ['hours', 'HOURS'],
        ]);
        this.appendDummyInput().appendField('Add');

        this.appendValueInput('VALUE').setCheck(['Int', 'Expression']);
        this.appendValueInput('TIMESTAMP')
            .setCheck(['Timescript', 'Expression'])
            .appendField(dropDown, 'UNIT')
            .appendField('to timestamp');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Add/Subract time from timestamp.\n-\n(TInt(), TTimestamp()) => TTimestamp()\n`);

        this.setColour(200);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.add_time, {
    toValue: (block: Block) => {
        const unit: string = block.getFieldValue('UNIT');
        const timestamp: IExpression<any> = SmartML.toValue(block, 'TIMESTAMP');
        const amount: IExpression<any> = SmartML.toValue(block, 'VALUE');
        switch (unit) {
            case 'SECONDS':
                return AddSeconds(timestamp, amount, buildErrorInfo(block));
            case 'MINUTES':
                return AddMinutes(timestamp, amount, buildErrorInfo(block));
            case 'HOURS':
                return AddHours(timestamp, amount, buildErrorInfo(block));
        }
        throw Error(`Unknown time unit: ${unit}`);
    },
});
