import type { Block } from 'blockly';
import Blockly from 'blockly';

import * as MichelsonCore from '@tezwell/michelson-sdk/core';
import SmartTSTypes from '@tezwell/smartts-sdk/core/type';
import SmartTSLiterals from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const UnitLiteralBlock = {
    type: BlockKind.unit_literal,
    message0: 'Unit',
    output: ['Literal', 'Unit'],
    colour: 20,
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
    toType: () => SmartTSTypes.TUnit,
    toValue: () => SmartTSLiterals.Unit(),
});
Michelson.addBlock(BlockKind.unit_literal, {
    toType: () => MichelsonCore.TUnit,
    toMichelson: () => MichelsonCore.Unit(),
});
