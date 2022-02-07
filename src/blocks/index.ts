import './base';
import './literals';
import './types';
import './Assert';
//
import './VariableBlocks';
import './ParamAccess';
//
import './comparison';
import './math';
import './blockchain_operations';

import Blockly from 'blockly';
import type { Block, Workspace } from 'blockly';
import type { IType, IValue } from '@tezwell/michelson-sdk/typings';
// import { CompilerAPI } from '@tezwell/smartts-sdk';

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
        storage: IValue;
        storageXML: string;
        code: string;
    };
}
export type Compilation =
    | ContactCompilation
    | {
          kind: CompilationKind.Value;
          result: IValue;
      }
    | {
          kind: CompilationKind.Type;
          result: IType;
      };

export const isContractCompilation = (c: Compilation): c is ContactCompilation => c.kind === CompilationKind.Contract;

export const extractBlocks = (workspace: Workspace) => workspace.getTopBlocks(true);

export const compileBlock = (block: Block): Compilation | null => {
    switch (block.type) {
        case BlockKind.entry_point_block:
        case BlockKind.set_variable_block:
        case BlockKind.assert_block:
            return null;
        case BlockKind.contract_block:
            const name = block.getFieldValue('NAME');

            const storageBlock = block.getInputTargetBlock('initial_storage');
            if (!storageBlock) {
                throw new Error(`Contract (${name}) requires an initial storage.`);
            }
            // The xml will be used in the deployment page
            const storageXML = Blockly.Xml.domToText(Blockly.Xml.blockToDom(storageBlock));

            // Translate contract block to SmartML
            const code = SmartML.blockToCode(block) as string;

            return {
                kind: CompilationKind.Contract,
                result: {
                    name: block.getFieldValue('NAME'),
                    storage: Michelson.translateValue(storageBlock),
                    storageXML: `<xml xmlns="http://www.w3.org/1999/xhtml">${storageXML}</xml>`,
                    code: 'JSON.stringify(CompilerAPI.default.compileContract(code), null, 4)',
                },
            };
        case BlockKind.string_type:
        case BlockKind.unit_type:
            return {
                kind: CompilationKind.Type,
                result: Michelson.translateType(block),
            };
        default:
            return {
                kind: CompilationKind.Value,
                result: Michelson.translateValue(block),
            };
    }
};
