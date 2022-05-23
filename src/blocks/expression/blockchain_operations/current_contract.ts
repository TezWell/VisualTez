import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';

import { TContract, TUnknown } from '@tezwell/smartts-sdk/type';
import { GetSelf } from '@tezwell/smartts-sdk';
import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';

const GetCurrentContractBlock = {
    type: BlockKind.get_current_contract_block,
    message0: 'Get contract of entrypoint %1',
    args0: [
        {
            type: 'field_input',
            name: 'entry_point',
            text: 'default',
            check: 'String',
        },
    ],
    tooltip: 'Returns the current contract.\n-\nTContract(...)',
    output: ['Expression', 'Contract'],
    colour: 1,
};

Blockly.Blocks[BlockKind.get_current_contract_block] = {
    init: function () {
        this.jsonInit(GetCurrentContractBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_current_contract_block, {
    toType: () => TContract(TUnknown()),
    toValue: (block: Block) => {
        return GetSelf(block.getFieldValue('entry_point'));
    },
});
