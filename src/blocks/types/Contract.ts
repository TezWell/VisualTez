import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TContract as ST_TContract } from '@tezwell/smartts-sdk/type';
import { TContract as M_TContract } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const ContractBlock = {
    type: BlockKind.contract_type,
    message0: 'Type | Contract of %1',
    args0: [
        {
            type: 'input_value',
            name: 'inner_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    outputShape: 3,
    colour: 230,
};

Blockly.Blocks[BlockKind.contract_type] = {
    init: function () {
        this.jsonInit(ContractBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.contract_type, {
    toType: (block: Block) => {
        const type = SmartML.toType(block, 'inner_type');
        return ST_TContract(type);
    },
});

Michelson.addBlock(BlockKind.contract_type, {
    toType: (block: Block) => {
        const type = Michelson.toType(block, 'inner_type');
        return M_TContract(type);
    },
});
