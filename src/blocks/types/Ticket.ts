import Blockly, { Block } from 'blockly';

import { TTicket as ST_TTicket } from '@tezwell/smartts-sdk/type';
import { TTicket as M_TTicket } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const TicketBlock = {
    type: BlockKind.ticket_type,
    message0: 'Type | Ticket of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.ticket_type] = {
    init: function () {
        this.jsonInit(TicketBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.ticket_type, {
    toType: (block: Block) => {
        const type = SmartML.toType(block, 'inner_type');
        return ST_TTicket(type);
    },
});

Michelson.addBlock(BlockKind.ticket_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return M_TTicket(type);
    },
});
