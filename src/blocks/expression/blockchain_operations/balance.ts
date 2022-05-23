import Blockly from 'blockly';

import { TMutez } from '@tezwell/smartts-sdk/type';
import { GetBalance } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetBalanceBlock = {
    type: BlockKind.get_balance_block,
    message0: 'Get Balance',
    tooltip: 'Returns the current amount of mutez of the executing contract.\n-\nTMutez()',
    output: ['Expression', 'Mutez'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_balance_block] = {
    init: function () {
        this.jsonInit(GetBalanceBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_balance_block, {
    toType: () => TMutez(),
    toValue: () => GetBalance(),
});
