import Blockly from 'blockly';

import type { Block } from 'src/typings/blockly';
import {
    ContractStorage,
    GetVariable,
    Iterator,
    LambdaArgument,
    MethodArgument,
    VariantCaseArgument,
} from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { extractVariableName } from '../utils/variables';
import Context, { ScopeKind, VariableKind } from '../core/context';
import { buildErrorInfo } from '../utils/errorHandling';
import { FieldVariableGetter } from 'src/components/blockly/overrides/field_variable_getter';

/** @deprecated */
Blockly.Blocks[BlockKind.contract_storage_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.contract_storage_block,
            message0: 'Contract Storage',
            output: ['Variable', 'Expression'],
            colour: 80,
        });
    },
};
/** @deprecated */
SmartML.addBlock(BlockKind.contract_storage_block, {
    toValue: () => {
        return ContractStorage();
    },
});

Blockly.Blocks[BlockKind.variables_get_v2] = {
    init: function () {
        const variable = new FieldVariableGetter(undefined, Object.values(VariableKind));
        this.appendDummyInput().appendField('Access variable').appendField(variable, 'VAR');
        this.setTooltip('Access the value of a given variable.');
        this.setOutput(true, ['Variable', 'Expression']);
        this.setColour(80);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    },
};

const AccessVariableBlock = {
    toValue: (block: Block) => {
        const variableName = extractVariableName(block, 'VAR');
        const line = buildErrorInfo(block);

        for (const scope of Context.contract.scopes) {
            switch (scope.kind) {
                case ScopeKind.View:
                case ScopeKind.Entrypoint:
                    if (variableName in scope.variables) {
                        switch (scope.variables[variableName].kind) {
                            case VariableKind.EntrypointOrViewArgument:
                                return MethodArgument(line);
                            case VariableKind.ContractStorage:
                                return ContractStorage();
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
                case ScopeKind.MatchCase:
                    if (variableName in scope.variables) {
                        switch (scope.variables[variableName].kind) {
                            case VariableKind.VariantArgument:
                                return VariantCaseArgument(variableName, line);
                        }
                    }
                    break;
            }
        }

        return GetVariable(variableName, line);
    },
};
SmartML.addBlock(BlockKind.variables_get, AccessVariableBlock);
SmartML.addBlock(BlockKind.variables_get_v2, AccessVariableBlock);
