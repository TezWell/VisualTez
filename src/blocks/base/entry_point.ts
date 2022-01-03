import Blockly from 'blockly/core';
import { EntryPoint } from '@tezwell/smartts-sdk/core';

import SmartML from '../../generators/SmartML';

const EntryPointBlock = {
    type: 'entry_point_block',
    message0: 'Entry point %1',
    args0: [
        {
            type: 'field_input',
            name: 'entry_point_name',
            text: 'Name',
        },
    ],
    message1: 'Code %1',
    args1: [{ type: 'input_statement', name: 'entry_point_code' }],
    colour: 140,
    previousStatement: null,
    nextStatement: null,
};

Blockly.Blocks[EntryPointBlock.type] = {
    init: function () {
        const self = this as any;
        self.jsonInit(EntryPointBlock);
    },
};
// @TODO support fragments
SmartML[EntryPointBlock.type] = function (block: any) {
    return '';
};

SmartML.blocks[EntryPointBlock.type] = {
    toStatement: (block: any) => {
        const name = block.getFieldValue('entry_point_name');
        return new EntryPoint(name).code(() => SmartML.statementToCode(block, 'entry_point_code')).toString();
    },
};
