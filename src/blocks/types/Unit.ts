import Blockly from 'blockly';

import { TUnit } from '@tezwell/smartts-sdk/core/type';
import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const UnitTypeBlock = {
    type: BlockKind.unit_type,
    message0: 'Unit',
    output: 'Type',
    colour: 48,
};

Blockly.Blocks[BlockKind.unit_type] = {
    init: function () {
        this.jsonInit(UnitTypeBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.unit_type, {
    toType: () => {
        return TUnit;
    },
});

Michelson.addBlock(BlockKind.unit_type, {
    toType: () => {
        return MichelsonCore.Type.TUnit;
    },
});