import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { ReadTicket } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.read_ticket_expression] = {
    init: function () {
        this.appendValueInput('TICKET').setCheck(['Expression']).appendField('Read ticket');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Retrieve the information stored in a ticket. Also returns the ticket.\n-\n
        TTicket(some_type()) => TPair(TPair(TAddress(), some_type(), TNat()), TTicket(some_type()))\n`);
        this.setColour(200);

        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.read_ticket_expression, {
    toValue: (block: Block) => {
        const ticket: IExpression<any> = SmartML.toValue(block, 'TICKET');
        return ReadTicket(ticket, buildErrorInfo(block));
    },
});
