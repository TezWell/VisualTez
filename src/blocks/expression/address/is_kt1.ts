import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { AddressHelpers } from '@tezwell/smartts-sdk/lib';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';

Blockly.Blocks[BlockKind.address_is_kt1] = {
    init: function () {
        this.appendValueInput('ADDRESS').setCheck(['Address', 'Expression']);
        this.appendDummyInput().appendField('is an originated contract');

        this.setInputsInline(true);
        this.setOutput(true, ['Expression']);
        this.setColour(200);
        this.setTooltip(`Verifies if a given address is an originated contract (KT1).\n-\nTAddress => TBool()`);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.address_is_kt1, {
    toValue: (block: Block) => {
        const address: IExpression<any> = SmartML.toValue(block, 'ADDRESS');
        return AddressHelpers.IsKT1(address);
    },
});
