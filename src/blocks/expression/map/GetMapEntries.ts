import Blockly, { Block } from 'blockly';
import { GetMapEntries } from '@tezwell/smartts-sdk';

import BlockKind from '../../enums/BlockKind';
import SmartML from '../../generators/SmartML';
import { buildErrorInfo } from 'src/blocks/utils/errorHandling';

const GetMapEntriesBlock = {
    type: BlockKind.get_map_entries,
    message0: 'Get map entries %1',
    args0: [{ type: 'input_value', name: 'FROM', check: ['Literal', 'Expression'] }],
    colour: 123,
    inputsInline: true,
    output: ['Expression'],
};

Blockly.Blocks[BlockKind.get_map_entries] = {
    init: function () {
        this.jsonInit(GetMapEntriesBlock);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

SmartML.addBlock(BlockKind.get_map_entries, {
    toValue: (block: Block) => {
        const expression = SmartML.toValue(block, 'FROM');
        return GetMapEntries(expression, buildErrorInfo(block));
    },
});
