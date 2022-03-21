import type { Block } from 'blockly';
import Blockly from 'blockly';
import { ContractStorage, GetVariable, Iterator, LambdaArgument, MethodArgument } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { extractVariableName } from '../utils/variables';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';

Blockly.Blocks[BlockKind.contract_storage_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.contract_storage_block,
            message0: 'Contract Storage',
            output: 'Expression',
            colour: 80,
        });
    },
};
SmartML.addBlock(BlockKind.contract_storage_block, {
    toValue: () => {
        return ContractStorage();
    },
});

SmartML.addBlock(BlockKind.variables_get, {
    toValue: (block: Block) => {
        const variableName = extractVariableName(block, 'VAR');
        const line = buildErrorInfo(block);

        for (const scope of Context.main.scopes) {
            switch (scope.kind) {
                case ScopeKind.View:
                case ScopeKind.Entrypoint:
                    if (variableName in scope.variables) {
                        switch (scope.variables[variableName].kind) {
                            case VariableKind.EntrypointOrViewArgument:
                                return MethodArgument(line);
                        }
                    }
                    break;
                case ScopeKind.For:
                    if (variableName in scope.variables) {
                        switch (scope.variables[variableName].kind) {
                            case VariableKind.Iterator:
                                return Iterator(variableName, line);
                        }
                    }
                    break;
                case ScopeKind.Lambda:
                    if (variableName in scope.variables) {
                        switch (scope.variables[variableName].kind) {
                            case VariableKind.LambdaArgument:
                                return LambdaArgument(variableName, scope.variables[variableName].type, scope.id, line);
                        }
                    }
                    break;
            }
        }

        return GetVariable(variableName, line);
    },
});
