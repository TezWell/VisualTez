import { DeleteMapEntry } from '@tezwell/smartts-sdk';
import type { Block } from 'blockly';
import Blockly from 'blockly';

import SmartML from 'src/blocks/generators/SmartML';
import BlockKind from '../../enums/BlockKind';
import { buildErrorInfo } from '../../utils/errorHandling';

const DeleteMapEntryBlock = {
    type: BlockKind.delete_map_entry,
    message0: 'Delete key %1 from map %2',
    args0: [
        {
            type: 'input_value',
            name: 'KEY',
            check: ['Literal', 'Expression'],
        },
        { type: 'input_value', name: 'MAP', check: ['Literal', 'Expression'] },
    ],
    colour: 20,
    inputsInline: true,
};

Blockly.Blocks[BlockKind.delete_map_entry] = {
    init: function () {
        this.jsonInit(DeleteMapEntryBlock);
        this.setPreviousStatement(true, ['Statement']);
        this.setNextStatement(true, ['Statement']);
    },
};

SmartML.addBlock(BlockKind.delete_map_entry, {
    toStatement: (block: Block) => {
        const key = SmartML.toValue(block, 'KEY');
        const map = SmartML.toValue(block, 'MAP');
        return DeleteMapEntry(map, key, buildErrorInfo(block));
    },
});
