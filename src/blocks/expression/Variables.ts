import type { Block } from 'blockly';
import Blockly from 'blockly';
import { ContractStorage, GetLocal, Iterator, MethodArgument } from '@tezwell/smartts-sdk';

import BlockKind from '../enums/BlockKind';
import SmartML from '../generators/SmartML';
import { extractVariableName } from '../utils/variables';
import Context, { ScopeKind, VariableKind } from '../core/context';

Blockly.Blocks[BlockKind.contract_storage_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.contract_storage_block,
            message0: 'Contract Storage',
            output: null,
            colour: 80,
        });
    },
};
SmartML.addBlock(BlockKind.contract_storage_block, {
    toValue: () => {
        return ContractStorage();
    },
});

Blockly.Blocks[BlockKind.entrypoint_arg_block] = {
    init: function () {
        this.jsonInit({
            type: BlockKind.entrypoint_arg_block,
            message0: 'Entrypoint Argument',
            output: null,
            colour: 80,
        });
    },
};
SmartML.addBlock(BlockKind.entrypoint_arg_block, {
    toValue: () => {
        return MethodArgument();
    },
});

SmartML.addBlock(BlockKind.variables_get, {
    toValue: (block: Block) => {
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

        return GetLocal(variableName);
    },
});
