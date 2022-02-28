import type { Block } from 'blockly';
import Blockly from 'blockly';
import { ContractStorage, GetLocal, Iterator, MethodArgument } from '@tezwell/smartts-sdk/expression';

import SmartML from './generators/SmartML';
import BlockKind from './enums/BlockKind';
import Variable from './enums/Variable';
import Context, { ScopeKind, VariableKind } from './core/context';
import { extractVariableName } from './utils/variables';

// Remove Default "change block" from variables section
Blockly.Blocks['math_change'] = undefined;

SmartML.addBlock(BlockKind.variables_get, {
    toValue: (block: Block) => {
        const variable = block.getFieldValue('VAR');
        console.error(variable);
        switch (variable) {
            case Variable.contract_storage:
                return ContractStorage();
            case Variable.entrypoint_arg:
                return MethodArgument();
            default:
                // Blockly Typescript support is terrible
                const variableName = extractVariableName(block, 'VAR');
                for (const scope of Context.main.scopes) {
                    switch (scope.kind) {
                        case ScopeKind.For:
                            if (variableName in scope.variables) {
                                switch (scope.variables[variableName].kind) {
                                    case VariableKind.Iterator:
                                        return Iterator(variableName);
                                }
                            }
                    }
                }
                console.error(variableName);
                return GetLocal(variableName);
        }
        throw new Error('Could not compile (Variable Access) expression.');
    },
});
