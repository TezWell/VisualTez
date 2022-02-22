import Blockly from 'blockly';

import { TMutez } from '@tezwell/smartts-sdk/type';
import { GetAmount } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../enums/BlockKind';

const GetAmountBlock = {
    type: BlockKind.get_amount_block,
    message0: 'Get Amount',
    tooltip: 'Returns the amount of the current transaction.',
    output: ['Expression', 'Mutez'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_amount_block] = {
    init: function () {
        this.jsonInit(GetAmountBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_amount_block, {
    toType: () => TMutez(),
    toValue: () => GetAmount(),
});
