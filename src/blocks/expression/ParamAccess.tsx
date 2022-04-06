import { GetProperty } from '@tezwell/smartts-sdk';
import Blockly, { Block } from 'blockly';
import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { buildErrorInfo } from '../utils/errorHandling';

const ParamAccessBlock = {
    type: BlockKind.param_access,
    message0: 'Get property %1 of record %2',
    args0: [
        {
            type: 'field_input',
            name: 'PROP',
            text: '',
            check: 'String',
        },
        { type: 'input_value', name: 'RECORD', check: ['Literal', 'Expression'] },
    ],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.param_access] = {
    init: function () {
        this.jsonInit(ParamAccessBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.param_access, {
    toValue: (block: Block) => {
        const propertyName = block.getFieldValue('PROP');
        const ofExpression = SmartML.toValue(block, 'RECORD');
        return GetProperty(ofExpression, propertyName, buildErrorInfo(block));
    },
});
