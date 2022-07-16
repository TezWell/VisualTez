import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { CreateTicket } from '@tezwell/smartts-sdk';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

Blockly.Blocks[BlockKind.create_ticket_expression] = {
    init: function () {
        this.appendValueInput('CONTENT').setCheck(['Literal', 'Expression']).appendField('Create ticket with content');
        this.appendValueInput('QUANTITY').setCheck(['Nat', 'Expression']).appendField('of quantity');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);

        this.setTooltip(`Creates a ticket with some content and an amount.\n-\n
        (some_type(), TString()) => TTicket(some_type())\n`);
        this.setColour(200);

        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.create_ticket_expression, {
    toValue: (block: Block) => {
        const content: IExpression<any> = SmartML.toValue(block, 'CONTENT');
        const quantity: IExpression<any> = SmartML.toValue(block, 'QUANTITY');
        return CreateTicket(content, quantity, buildErrorInfo(block));
    },
});
