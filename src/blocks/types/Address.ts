import Blockly from 'blockly';

import { TAddress } from '@tezwell/smartts-sdk/type';
import { TAddress as M_TAddress } from '@tezwell/michelson-sdk/type';
import SmartML from '../generators/SmartML';
import BlockKind from '../enums/BlockKind';
import Michelson from '../generators/Michelson';

const AddressBlock = {
    type: BlockKind.address_type,
    message0: 'Type: Address',
    output: 'Type',
    colour: 20,
};

Blockly.Blocks[BlockKind.address_type] = {
    init: function () {
        this.jsonInit(AddressBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.address_type, {
    toType: () => {
        return TAddress();
    },
});

Michelson.addBlock(BlockKind.address_type, {
    toType: () => {
        return M_TAddress();
    },
});
