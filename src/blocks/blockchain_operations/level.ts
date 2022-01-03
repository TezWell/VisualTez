import Blockly from 'blockly/core';
import { TNat } from '@tezwell/smartts-sdk/core/type';
import { GetLevel } from '@tezwell/smartts-sdk/core';
import SmartML from '../../generators/SmartML';

const BlockLevel = {
    type: 'head_level_block',
    message0: 'Get Level',
    tooltip: 'Returns the level of the head block.',
    output: 'Number',
    colour: 1,
};

Blockly.Blocks[BlockLevel.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(BlockLevel);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};
SmartML.blocks[BlockLevel.type] = {
    toType: () => TNat,
    toValue: () => GetLevel(),
};
