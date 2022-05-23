import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TNat } from '@tezwell/smartts-sdk/type';
import { GetVotingPower } from '@tezwell/smartts-sdk';
import { ILiteral } from '@tezwell/smartts-sdk/typings/literal';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetVotingPowerBlock = {
    type: BlockKind.get_voting_power,
    message0: 'Get voting power of %1',
    args0: [
        {
            type: 'input_value',
            name: 'account',
            check: 'Key_hash',
        },
    ],
    tooltip: 'Returns the voting power of a given contract.\n-\nTNat()',
    output: ['Expression', 'Nat'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_voting_power] = {
    init: function () {
        this.jsonInit(GetVotingPowerBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_voting_power, {
    toType: () => TNat(),
    toValue: (block: Block) => {
        const account: ILiteral<any> = SmartML.toValue(block, 'account');
        return GetVotingPower(account);
    },
});
