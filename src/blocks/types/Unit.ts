import Blockly from 'blockly';

import { TUnit } from '@tezwell/smartts-sdk/type';
import MichelsonTypes from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const UnitTypeBlock = {
    type: BlockKind.unit_type,
    message0: 'Type: Unit',
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
        return TUnit();
    },
});

Michelson.addBlock(BlockKind.unit_type, {
    toType: () => {
        return MichelsonTypes.TUnit();
    },
});
