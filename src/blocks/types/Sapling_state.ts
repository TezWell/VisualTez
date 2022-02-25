import Blockly, { Block } from 'blockly';

import { TSapling_state as ST_TSapling_state } from '@tezwell/smartts-sdk/type';
import { TSapling_state as M_TSapling_state } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const Sapling_stateBlock = {
    type: BlockKind.sapling_state_type,
    message0: 'Type: Sapling_state ( memo %1)',
    args0: [
        {
            type: 'field_input',
            name: 'memo',
            text: '',
            check: 'Number',
        },
    ],
    output: 'Type',
    colour: 260,
};

Blockly.Blocks[BlockKind.sapling_state_type] = {
    init: function () {
        this.jsonInit(Sapling_stateBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.sapling_state_type, {
    toType: (block: Block) => {
        return ST_TSapling_state(block.getFieldValue('memo'));
    },
});

Michelson.addBlock(BlockKind.sapling_state_type, {
    toType: (block: Block) => {
        return M_TSapling_state(block.getFieldValue('memo'));
    },
});
