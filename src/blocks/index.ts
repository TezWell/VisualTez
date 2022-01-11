import './base';
import './literals';
import './types';
import './Assert';
//
import './SetVariable';
import './GetVariable';
//
import './comparison';
import './blockchain_operations';

import { Michelson_LiteralUnion } from '@tezwell/michelson-sdk/core';
import SmartMLSDK from '@tezwell/smartts-sdk/smartml';

import type { Block, Workspace } from 'blockly';
import BlockKind from './enums/BlockKind';
import SmartML from './generators/SmartML';
import Michelson from './generators/Michelson';

export enum CompilationKind {
    Contract = 'contract',
    Value = 'value',
}
export interface ContactCompilation {
    kind: CompilationKind.Contract;
    result: {
        name: string;
        storage: Michelson_LiteralUnion;
        code: string;
    };
}
export type Compilation =
    | ContactCompilation
    | {
          kind: CompilationKind.Value;
          result: Michelson_LiteralUnion;
      };

export const isContractCompilation = (c: Compilation): c is ContactCompilation => c.kind === CompilationKind.Contract;

export const extractBlocks = (workspace: Workspace) => workspace.getTopBlocks(true);

export const compileBlock = (block: Block): Compilation => {
    switch (block.type) {
        case BlockKind.contract_block:
            console.error(block);
            const storageBlock = block.getInputTargetBlock('initial_storage');
            const code = SmartML.blockToCode(block) as string;
            return {
                kind: CompilationKind.Contract,
                result: {
                    name: block.getFieldValue('contract_name'),
                    storage: Michelson.translate(storageBlock),
                    code: JSON.stringify(SmartMLSDK.compileContract(code), null, 4),
                },
            };
        default:
            console.error(block.type);
            return {
                kind: CompilationKind.Value,
                result: Michelson.translate(block),
            };
    }
};
