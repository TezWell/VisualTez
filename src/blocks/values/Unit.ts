import Blockly from 'blockly';

import { Unit as M_Unit } from '@tezwell/michelson-sdk/literal';
import { TUnit as M_TUnit } from '@tezwell/michelson-sdk/type';
import { TUnit as ST_TUnit } from '@tezwell/smartts-sdk/type';
import { Unit as ST_Unit } from '@tezwell/smartts-sdk/expression';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const UnitLiteralBlock = {
    type: BlockKind.unit_literal,
    message0: 'Unit',
    output: ['Literal', 'Unit'],
    colour: 40,
    tooltip: 'Unit Literal',
};
Blockly.Blocks[BlockKind.unit_literal] = {
    init: function () {
        this.jsonInit(UnitLiteralBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.unit_literal, {
    toType: () => ST_TUnit(),
    toValue: () => ST_Unit(),
});
Michelson.addBlock(BlockKind.unit_literal, {
    toType: () => M_TUnit(),
    toMichelson: () => M_Unit(),
});
