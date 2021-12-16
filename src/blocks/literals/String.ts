import { TString } from '@tezwell/smartts-sdk/core/type';
import { String } from '@tezwell/smartts-sdk/core/literal';
import Blockly from 'blockly/core';
import SmartML from '../../generators/SmartML';

const StringBlock = {
    type: 'string_block',
    message0: 'String %1',
    args0: [
        {
            type: 'field_input',
            name: 'string_value',
            check: 'String',
        },
    ],
    output: 'String',
    colour: 100,
};

Blockly.Blocks[StringBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(StringBlock);
        self.setPreviousStatement(false);
        self.setNextStatement(false);
    },
};

SmartML.blocks[StringBlock.type] = {
    toType: () => {
        return TString;
    },
    toValue: (block: any) => {
        return String(block.getFieldValue('string_value'));
    },
};
