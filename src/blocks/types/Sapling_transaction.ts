import Blockly, { Block } from 'blockly';

import { TSapling_transaction as ST_TSapling_transaction } from '@tezwell/smartts-sdk/type';
import { TSapling_transaction as M_TSapling_transaction } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Sapling_transactionBlock = {
    type: BlockKind.sapling_transaction_type,
    message0: 'Type | Sapling_transaction ( memo %1)',
    args0: [
        {
            type: 'field_input',
            name: 'memo',
            text: '',
            check: 'Number',
        },
    ],
    output: 'Type',
    colour: 230,
};

Blockly.Blocks[BlockKind.sapling_transaction_type] = {
    init: function () {
        this.jsonInit(Sapling_transactionBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.sapling_transaction_type, {
    toType: (block: Block) => {
        return ST_TSapling_transaction(block.getFieldValue('memo'));
    },
});

Michelson.addBlock(BlockKind.sapling_transaction_type, {
    toType: (block: Block) => {
        return M_TSapling_transaction(block.getFieldValue('memo'));
    },
});
