import { IType } from '@tezwell/smartts-sdk/typings/type';
import BlockKind from '../enums/BlockKind';

export enum ScopeKind {
    Contract,
    Entrypoint,
    View,
    For,
    Lambda,
    MatchCase,
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
          kind: ScopeKind.Contract;
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

const increment = (v: number) => v + 1;
const decrement = (v: number) => v + (v > 0 ? -1 : 0);

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

    // - Scope methods

    incrementCounter = (kind: BlockKind) => {
        const newCounter = increment(this.getBlockCounter(kind));
        this.blockCounter.set(kind, newCounter);
        return newCounter;
    };
    decrementCounter = (kind: BlockKind) => {
        const newCounter = decrement(this.getBlockCounter(kind));
        this.blockCounter.set(kind, newCounter);
        return newCounter;
    };

    clear() {
        this.blockCounter.clear();
    }

    private getBlockCounter = (kind: BlockKind) => this.blockCounter.get(kind) || 0;
}

const Context = {
    main: new CompilationContext(),
    reset: function () {
        this.main = new CompilationContext();
    },
};

export default Context;
