import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { GetContract, TUnit } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const GetContractBlock = {
    type: BlockKind.get_contract,
    message0: 'Contract with address %1 and entrypoint %2',
    args0: [
        { type: 'input_value', name: 'ADDRESS', check: ['Literal', 'Expression'] },
        {
            type: 'field_input',
            name: 'ENTRYPOINT',
            text: 'default',
            check: 'String',
        },
    ],
    message1: 'with type argument %1',
    args1: [{ type: 'input_value', name: 'ARGUMENT_TYPE', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_contract] = {
    init: function () {
        this.jsonInit(GetContractBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_contract, {
    toValue: (block: Block) => {
        const entrypoint = block.getFieldValue('ENTRYPOINT');
        const address: IExpression<any> = SmartML.toValue(block, 'ADDRESS');
        const type = SmartML.toType(block, 'ARGUMENT_TYPE', TUnit());
        return GetContract(address, entrypoint, type, buildErrorInfo(block));
    },
});
