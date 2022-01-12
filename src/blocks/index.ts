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

import { Michelson_LiteralUnion, Michelson_Type } from '@tezwell/michelson-sdk/core';
import SmartMLSDK from '@tezwell/smartts-sdk/smartml';

import type { Block, Workspace } from 'blockly';
import BlockKind from './enums/BlockKind';
import SmartML from './generators/SmartML';
import Michelson from './generators/Michelson';

export enum CompilationKind {
    Contract = 'contract',
    Value = 'value',
    Type = 'type',
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
      }
    | {
          kind: CompilationKind.Type;
          result: Michelson_Type;
      };

export const isContractCompilation = (c: Compilation): c is ContactCompilation => c.kind === CompilationKind.Contract;

export const extractBlocks = (workspace: Workspace) => workspace.getTopBlocks(true);

export const compileBlock = (block: Block): Compilation | null => {
    switch (block.type) {
        case BlockKind.entry_point_block:
            return null;
        case BlockKind.contract_block:
            const storageBlock = block.getInputTargetBlock('initial_storage');
            const code = SmartML.blockToCode(block) as string;
            return {
                kind: CompilationKind.Contract,
                result: {
                    name: block.getFieldValue('NAME'),
                    storage: Michelson.translateValue(storageBlock),
                    code: JSON.stringify(SmartMLSDK.compileContract(code), null, 4),
                },
            };
        case BlockKind.string_type:
            console.error(block);
            return {
                kind: CompilationKind.Type,
                result: Michelson.translateType(block),
            };
        default:
            console.error(block.type);
            return {
                kind: CompilationKind.Value,
                result: Michelson.translateValue(block),
            };
    }
};
