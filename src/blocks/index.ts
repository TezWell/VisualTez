import type { Block, Workspace } from 'blockly';
import type { IValue, MichelsonJSON, MichelsonMicheline } from '@tezwell/michelson-sdk/typings';
import Blockly from 'blockly';
import Compiler from '@tezwell/smartts-sdk/compiler';

import './base';
import './values';
import './types';
import './statement';
import './expression';

import BlockKind from './enums/BlockKind';
import Michelson from './generators/Michelson';
import Context from './core/context';
import { extractContract } from './base/contract';
import { Unit } from '@tezwell/michelson-sdk/literal';

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
        smartpy: string;
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
    kind: CompilationKind.Value;
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

            return {
                kind: CompilationKind.Type,
                result: {
                    name,
                    micheline: type.toMicheline(),
                    json: type.toJSON(),
                },
            };
        }
        case BlockKind.value_compilation: {
            const name = block.getFieldValue('NAME');

            const value = Michelson.toMichelson(block, 'value');

            return {
                kind: CompilationKind.Value,
                result: {
                    name,
                    micheline: value.toMicheline(),
                    json: value.toJSON(),
                },
            };
        }
        case BlockKind.contract_block:
            // Reset context
            Context.reset();

            const storageBlock = block.getInputTargetBlock('initial_storage');

            // The xml will be used in the deployment page
            const storageXML = storageBlock ? Blockly.Xml.domToText(Blockly.Xml.blockToDom(storageBlock)) : '';

            // Translate contract block to SmartML
            const code = extractContract(block);

            const compilation = Compiler.compileContract(code);

            console.error(compilation);

            return {
                kind: CompilationKind.Contract,
                result: {
                    name: block.getFieldValue('NAME'),
                    storage: storageBlock ? Michelson.translateValue(storageBlock) : Unit(),
                    storageXML: `<xml xmlns="http://www.w3.org/1999/xhtml">${storageXML}</xml>`,
                    code: JSON.stringify(compilation.json, null, 4),
                    smartpy: compilation.smartpy,
                },
            };

        default:
            return null;
    }
};
