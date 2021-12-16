import Blockly from 'blockly/core';
import { TBool } from '@tezwell/smartts-sdk/core/type';
import { Bool } from '@tezwell/smartts-sdk/core/literal';
import SmartML from '../../generators/SmartML';

const BooleanBlock = {
    type: 'boolean_block',
    message0: 'Boolean %1',
    args0: [
        {
            type: 'field_dropdown',
            name: 'boolean_value',
            options: [
                ['True', 'True'],
                ['False', 'False'],
            ],
            check: 'Boolean',
        },
    ],
    output: 'Boolean',
    colour: 40,
};

Blockly.Blocks[BooleanBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(BooleanBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[BooleanBlock.type] = {
    toType: () => {
        return TBool;
    },
    toValue: (block: any) => {
        return Bool(block.getFieldValue('boolean_value') === 'True');
    },
};
