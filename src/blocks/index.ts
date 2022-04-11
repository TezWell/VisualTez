import type { Block, Workspace } from 'blockly';
import type { IValue, MichelsonJSON, MichelsonMicheline } from '@tezwell/michelson-sdk/typings';
import Blockly from 'blockly';
import Compiler from '@tezwell/smartts-sdk/compiler';
import { Unit } from '@tezwell/michelson-sdk/literal';

import './base';
import './values';
import './types';
import './statement';
import './expression';
import './testing';

import BlockKind from './enums/BlockKind';
import Michelson from './generators/Michelson';
import Context from './core/context';
import { extractContract } from './base/contract';
import Logger from 'src/utils/logger';
import { ITestAction } from './testing/utils';
import { extractTest } from './testing/test';

export enum Target {
    ContractCompilation = 'contract_compilation',
    ValueCompilation = 'value_compilation',
    TypeCompilation = 'type_compilation',
    Test = 'test',
}
export interface ContractCompilation {
    kind: Target.ContractCompilation;
    result: {
        name: string;
        storage: IValue;
        storageXML: string;
        codeJSON: string;
        codeMicheline: string;
        smartpy: string;
    };
}
export interface TypeCompilation {
    kind: Target.TypeCompilation;
    result: {
        name: string;
        micheline: MichelsonMicheline;
        json: MichelsonJSON;
    };
}
export interface ValueCompilation {
    kind: Target.ValueCompilation;
    result: {
        name: string;
        micheline: MichelsonMicheline;
        json: MichelsonJSON;
    };
}

export interface Test {
    kind: Target;
    result: {
        name: string;
        actions: ITestAction[];
    };
}
export type Compilation = ContractCompilation | ValueCompilation | TypeCompilation | Test;

export const filterCompilationKind =
    <T extends Compilation>(kind: Target) =>
    (c: Compilation): c is T =>
        c.kind === kind;

export const extractBlocks = (workspace: Workspace) => workspace.getTopBlocks(true);

export const compileBlock = (block: Block): Compilation | null => {
    switch (block.type) {
        case BlockKind.test: {
            const test = extractTest(block);

            return {
                kind: Target.Test,
                result: test,
            };
        }
        case BlockKind.type_compilation: {
            const name = block.getFieldValue('NAME');

            const type = Michelson.toType(block, 'type');

            return {
                kind: Target.TypeCompilation,
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
                kind: Target.ValueCompilation,
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

            Logger.debug(compilation);

            return {
                kind: Target.ContractCompilation,
                result: {
                    name: block.getFieldValue('NAME'),
                    storage: storageBlock ? Michelson.translateValue(storageBlock) : Unit(),
                    storageXML: `<xml xmlns="http://www.w3.org/1999/xhtml">${storageXML}</xml>`,
                    codeJSON: JSON.stringify(compilation.json, null, 4),
                    codeMicheline: compilation.micheline,
                    smartpy: compilation.smartpy,
                },
            };

        default:
            return null;
    }
};
