import Blockly from 'blockly';
import Compiler from '@tezwell/smartts-sdk/compiler';
import { Unit } from '@tezwell/michelson-sdk/literal';
import { TestSuite } from '@tezwell/tezos-testing-sdk';

import type { IValue, MichelsonJSON, MichelsonMicheline } from '@tezwell/michelson-sdk/typings';
import type { Block, Workspace } from 'src/typings/blockly';

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
        storageTypeXML: string;
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

export interface TestCompilation {
    kind: Target;
    result: {
        name: string;
        suite: TestSuite;
    };
}
export type Compilation = ContractCompilation | ValueCompilation | TypeCompilation | TestCompilation;

export const filterCompilationKind =
    <T extends Compilation>(kind: Target) =>
    (c: Compilation): c is T =>
        c.kind === kind;

export const extractBlocks = (workspace: Workspace) => {
    const priority: Record<string, number> = {
        [BlockKind.contract_block]: 0,
        [BlockKind.type_compilation]: 1,
        [BlockKind.value_compilation]: 2,
        [BlockKind.test]: 3,
    };
    // This clousure is used to avoid comparing undefined values
    const getPriority = (key: string): number => priority[key] || 9999;
    return workspace.getTopBlocks(true).sort((a: Block, b: Block) => {
        const [ap, bp] = [getPriority(a.type), getPriority(b.type)];
        return ap == bp ? 0 : ap > bp ? -1 : 1;
    });
};

export const compileBlock = (block: Block): Compilation | null => {
    switch (block.type) {
        case BlockKind.test: {
            const test = extractTest(block);

            console.error(test);

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
            const name = block.getFieldValue('NAME');
            if (!block.isEnabled()) {
                Logger.info(`Ignoring disabled contract block "${name}".`);
                // Do not try to compile disabled blocks
                return null;
            }

            // Reset context
            Context.resetContract();
            const storageBlock = block.getInputTargetBlock('initial_storage');
            const storageTypeBlock = block.getInputTargetBlock('TYPE');

            // The xml will be used in the deployment page
            const storageXML = storageBlock ? Blockly.Xml.domToText(Blockly.Xml.blockToDom(storageBlock)) : '';
            const storageTypeXML = storageBlock ? Blockly.Xml.domToText(Blockly.Xml.blockToDom(storageTypeBlock)) : '';

            // Translate contract block to SmartML
            const code = extractContract(block);

            const compilation = Compiler.compileContract(code);

            Context.testing.addContract(name, compilation.json);

            return {
                kind: Target.ContractCompilation,
                result: {
                    name,
                    storage: storageBlock ? Michelson.translateValue(storageBlock) : Unit(),
                    storageXML: `<xml xmlns="http://www.w3.org/1999/xhtml">${storageXML}</xml>`,
                    storageTypeXML: `<xml xmlns="http://www.w3.org/1999/xhtml">${storageTypeXML}</xml>`,
                    codeJSON: JSON.stringify(compilation.json, null, 4),
                    codeMicheline: compilation.micheline,
                    smartpy: compilation.smartpy,
                },
            };

        default:
            return null;
    }
};
