import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TLambda as ST_TLambda } from '@tezwell/smartts-sdk/type';
import { TLambda as M_TLambda } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const LambdaBlock = {
    type: BlockKind.lambda_type,
    message0: 'Type | Lambda (%1 -> %2)',
    args0: [
        {
            type: 'input_value',
            name: 'input_type',
            check: 'Type',
        },
        {
            type: 'input_value',
            name: 'output_type',
            check: 'Type',
        },
    ],
    output: 'Type',
    outputShape: 3,
    colour: 230,
};

Blockly.Blocks[BlockKind.lambda_type] = {
    init: function () {
        this.jsonInit(LambdaBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.lambda_type, {
    toType: (block: Block) => {
        const input_type = SmartML.toType(block, 'input_type');
        const output_type = SmartML.toType(block, 'output_type');
        return ST_TLambda(input_type, output_type);
    },
});

Michelson.addBlock(BlockKind.lambda_type, {
    toType: (block: Block) => {
        const input_type = Michelson.toType(block, 'input_type');
        const output_type = Michelson.toType(block, 'output_type');
        return M_TLambda(input_type, output_type);
    },
});
