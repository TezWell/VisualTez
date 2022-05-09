import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import { buildAction } from '@tezwell/tezos-testing-sdk';
import { ActionKind } from '@tezwell/tezos-testing-sdk/action';

import BlockKind from '../enums/BlockKind';
import Testing from '../generators/Testing';
import Michelson from '../generators/Michelson';

const PackData = {
    type: BlockKind.test__pack_data_action,
    message0: 'Show packed data %1 for type %2',
    args0: [
        {
            type: 'input_value',
            name: 'DATA',
            check: ['Literal'],
        },
        {
            type: 'input_value',
            name: 'TYPE',
            check: ['Type'],
        },
    ],
    inputsInline: true,
    colour: 300,
};

Blockly.Blocks[PackData.type] = {
    init: function () {
        this.jsonInit(PackData);
        this.setPreviousStatement(true, ['TestAction']);
        this.setNextStatement(true, ['TestAction']);
    },
};

Testing.addBlock(PackData.type, {
    toAction: (block: Block) => {
        const data: any = Michelson.toMichelson(block, 'DATA').toJSON();
        const type: any = Michelson.toType(block, 'TYPE').toJSON();
        return buildAction(ActionKind.PackData, { data, type });
    },
});
