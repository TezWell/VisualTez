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
import type { IValue, MichelsonJSON, MichelsonMicheline } from '@tezwell/michelson-sdk/typings';
import { CompilerAPI } from '@tezwell/smartts-sdk';

import BlockKind from './enums/BlockKind';
import SmartML from './generators/SmartML';
import Michelson from './generators/Michelson';

export enum CompilationKind {
    Contract = 'contract',
    Value = 'value',
    Type = 'type',
}
export interface ContractCompilation {
    kind: CompilationKind.Contract;
    result: {
        name: string;
        storage: IValue;
        storageXML: string;
        code: string;
    };
}
export interface TypeCompilation {
    kind: CompilationKind.Type;
    result: {
        name: string;
        micheline: MichelsonMicheline;
        json: MichelsonJSON;
    };
}
export interface ValueCompilation {
    kind: CompilationKind.Type;
    result: {
        name: string;
        micheline: MichelsonMicheline;
        json: MichelsonJSON;
    };
}
export type Compilation = ContractCompilation | ValueCompilation | TypeCompilation;

export const filterCompilationKind =
    <T extends Compilation>(kind: CompilationKind) =>
    (c: Compilation): c is T =>
        c.kind === kind;

export const extractBlocks = (workspace: Workspace) => workspace.getTopBlocks(true);

export const compileBlock = (block: Block): Compilation | null => {
    switch (block.type) {
        case BlockKind.type_compilation: {
            const name = block.getFieldValue('NAME');

            const type = Michelson.toType(block, 'type');

            console.log({
                kind: CompilationKind.Type,
                result: {
                    name,
                    micheline: type.toMicheline(),
                    json: type.toJSON(),
                },
            });

            return {
                kind: CompilationKind.Type,
                result: {
                    name,
                    micheline: type.toMicheline(),
                    json: type.toJSON(),
                },
            };
        }
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
                    code: JSON.stringify(CompilerAPI.compileContract(code), null, 4),
                },
            };

        default:
            return null;
    }
};
