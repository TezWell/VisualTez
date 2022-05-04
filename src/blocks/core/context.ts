import { IType } from '@tezwell/smartts-sdk/typings/type';

export enum ScopeKind {
    Contract,
    Entrypoint,
    View,
    For,
    Lambda,
    MatchCase,
    Test,
}

export enum VariableKind {
    Local = 'local',
    Iterator = 'iterator',
    LambdaArgument = 'lambda_argument',
    VariantArgument = 'variant_argument',
    EntrypointOrViewArgument = 'entry_argument',
    ContractStorage = 'contract_storage',
}

interface IVariable {
    kind: VariableKind;
    type?: IType;
    name: string;
}

type IScope =
    | {
          kind: ScopeKind.Contract | ScopeKind.Test;
      }
    | {
          kind: ScopeKind.Entrypoint | ScopeKind.View | ScopeKind.For | ScopeKind.MatchCase;
          variables: Record<string, IVariable>;
      }
    | {
          kind: ScopeKind.Lambda;
          variables: Record<string, IVariable>;
          id: number;
      };

class TestingContext {
    #contracts: Record<string, Record<string, unknown>[]> = {};

    /**
     * Adds contract reference
     *
     * @param name contract name
     * @returns void
     */
    public addContract(name: string, json: Record<string, unknown>[]): void {
        this.#contracts[name] = json;
    }
    /**
     * Get contract
     *
     * @param name contract name
     * @returns void
     */
    public getContract(name: string): Record<string, unknown>[] | null {
        return this.#contracts[name];
    }
}
class ContractContext {
    #scopes: IScope[] = [];

    // + Scope methods

    public enterScope(scope: IScope): void {
        this.#scopes.push(scope);
    }

    public exitScope(): void {
        this.#scopes.pop();
    }

    public get scope(): Readonly<IScope> {
        return this.#scopes[this.#scopes.length - 1];
    }

    public get scopes(): Readonly<IScope[]> {
        return [...this.#scopes].reverse();
    }
}

const Context = {
    contract: new ContractContext(),
    testing: new TestingContext(),
    resetContract: function () {
        this.contract = new ContractContext();
    },
    resetTesting: function () {
        this.testing = new TestingContext();
    },
};

export default Context;
