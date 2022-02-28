import BlockKind from '../enums/BlockKind';

export enum ScopeKind {
    Contract,
    Entrypoint,
    For,
}

type Scope =
    | {
          type: ScopeKind.Contract;
      }
    | {
          type: ScopeKind.Entrypoint;
      }
    | {
          type: ScopeKind.For;
          iterator: string;
      };

const increment = (v: number) => v + 1;
const decrement = (v: number) => v + (v > 0 ? -1 : 0);

class Context {
    private scopes: Scope[] = [];
    private blockCounter: Map<BlockKind, number> = new Map();

    // + Scope methods

    public enterScope(scope: Scope): void {
        this.scopes.push(scope);
    }

    public exitScope(): void {
        this.scopes.pop();
    }

    public get scope(): Readonly<Scope> {
        return this.scopes[this.scopes.length - 1];
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

const Ctx = {
    main: new Context(),
};

export default Ctx;
