import Blockly from 'blockly';

import { TOperation } from '@tezwell/smartts-sdk/type';
import { TOperation as M_TOperation } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const BlockConfig = {
    type: BlockKind.operation_type,
    message0: 'Type: Operation',
    output: 'Type',
    colour: 379,
};

Blockly.Blocks[BlockKind.operation_type] = {
    init: function () {
        this.jsonInit(BlockConfig);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.operation_type, {
    toType: () => {
        return TOperation();
    },
});

Michelson.addBlock(BlockKind.operation_type, {
    toType: () => {
        return M_TOperation();
    },
});
