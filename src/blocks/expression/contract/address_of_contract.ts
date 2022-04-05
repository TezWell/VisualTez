import Blockly, { Block } from 'blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { ToAddress } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const AddressOfContractBlock = {
    type: BlockKind.address_of_contract,
    message0: 'Address of contract %1',
    args0: [{ type: 'input_value', name: 'CONTRACT', check: ['Literal', 'Expression'] }],
    colour: 200,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.address_of_contract] = {
    init: function () {
        this.jsonInit(AddressOfContractBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.address_of_contract, {
    toValue: (block: Block) => {
        const contract: IExpression<any> = SmartML.toValue(block, 'CONTRACT');
        return ToAddress(contract, buildErrorInfo(block));
    },
});
