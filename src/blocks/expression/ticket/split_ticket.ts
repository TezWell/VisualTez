import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { SplitTicket } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.split_ticket_expression] = {
    init: function () {
        this.appendValueInput('TICKET').setCheck(['Expression']).appendField('Split ticket');
        this.appendValueInput('QUANTITY1').setCheck(['Nat', 'Expression']).appendField('into quantity');
        this.appendValueInput('QUANTITY2').setCheck(['Nat', 'Expression']).appendField('and quantity');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Splits a ticket in two.\n-\n
        (TTicket(some_type()), TNat(), TNat())  => TOption(TPair(TTicket(some_type()), TTicket(some_type())))\n`);
        this.setColour(200);

        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.split_ticket_expression, {
    toValue: (block: Block) => {
        const ticket: IExpression<any> = SmartML.toValue(block, 'TICKET');
        const quantity1: IExpression<any> = SmartML.toValue(block, 'QUANTITY1');
        const quantity2: IExpression<any> = SmartML.toValue(block, 'QUANTITY2');
        return SplitTicket(ticket, quantity1, quantity2, buildErrorInfo(block));
    },
});
