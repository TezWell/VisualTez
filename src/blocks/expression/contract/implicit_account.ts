import Blockly from 'blockly';
import type { Block } from 'src/typings/blockly';
import type { IExpression } from '@tezwell/smartts-sdk/typings/expression';
import { ImplicitAccount } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from '../../utils/errorHandling';

const ImplicitAccountBlock = {
    type: BlockKind.implicit_account,
    message0: 'Get contract from Key Hash %1',
    args0: [{ type: 'input_value', name: 'KEY_HASH', check: ['Literal', 'Expression'] }],
    colour: 200,
    tooltip: `
        Convert a public key has to a contract value.\n-\n
        TKeyHash() => TContract(TUnit())
    `,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.implicit_account] = {
    init: function () {
        this.jsonInit(ImplicitAccountBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.implicit_account, {
    toValue: (block: Block) => {
        const key_hash: IExpression<any> = SmartML.toValue(block, 'KEY_HASH');
        return ImplicitAccount(key_hash, buildErrorInfo(block));
    },
});
