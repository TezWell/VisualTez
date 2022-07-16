import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { JoinTicket } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.join_ticket_expression] = {
    init: function () {
        this.appendValueInput('TICKET1').setCheck(['Expression']).appendField('Join ticket');
        this.appendValueInput('TICKET2').setCheck(['Expression']).appendField('with ticket');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Join two tickets into one.\n-\n
        (TTicket(some_type()), TTicket(some_type())) => TTicket(some_type())\n`);
        this.setColour(200);

        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.join_ticket_expression, {
    toValue: (block: Block) => {
        const ticket1: IExpression<any> = SmartML.toValue(block, 'TICKET1');
        const ticket2: IExpression<any> = SmartML.toValue(block, 'TICKET2');
        return JoinTicket(ticket1, ticket2, buildErrorInfo(block));
    },
});
