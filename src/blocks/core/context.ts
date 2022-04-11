import { IType } from '@tezwell/smartts-sdk/typings/type';
import BlockKind from '../enums/BlockKind';

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
    Local,
    Iterator,
    LambdaArgument,
    VariantArgument,
    EntrypointOrViewArgument,
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

class CompilationContext {
    #scopes: IScope[] = [];
    private blockCounter: Map<BlockKind, number> = new Map();

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
    main: new CompilationContext(),
    reset: function () {
        this.main = new CompilationContext();
    },
};

export default Context;
