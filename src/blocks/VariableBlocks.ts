import type { Block } from 'blockly';
import Blockly from 'blockly';
import { SetValue } from '@tezwell/smartts-sdk/core/command';

import SmartML from './generators/SmartML';
import BlockKind from './enums/BlockKind';
import Variable from './enums/Variable';
import { ContractStorage, Expression } from '@tezwell/smartts-sdk/core/expression';

// Remove Default "change block" from variables section
Blockly.Blocks['math_change'] = undefined;

SmartML.addBlock(BlockKind.set_variable_block, {
    toStatement: (block: Block) => {
        const variable = block.getFieldValue('VAR');
        const value = SmartML.toValue(block, 'VALUE');
        switch (variable) {
            case Variable.contract_storage:
                return SetValue(ContractStorage(), value);
        }
        throw new Error('Could not compile (Set Variable) statement.');
    },
});

SmartML.addBlock(BlockKind.variables_get, {
    toValue: (block: Block) => {
        console.error(block);
        const variable = block.getFieldValue('VAR');
        switch (variable) {
            case Variable.contract_storage:
                return ContractStorage();
            case Variable.entrypoint_arg:
                return new Expression('params', '("" 0)');
        }
        throw new Error('Could not compile (Set Variable) statement.');
    },
});
