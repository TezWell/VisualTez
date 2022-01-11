import BlockKind from '../enums/BlockKind';

const increment = (v: number) => v + 1;
const decrement = (v: number) => v + (v > 0 ? -1 : 0);

class BlockDatabase {
    #blockCounter: Map<BlockKind, number> = new Map();

    #getBlockCounter = (kind: BlockKind) => this.#blockCounter.get(kind) || 0;

    incrementCounter = (kind: BlockKind) => {
        const newCounter = increment(this.#getBlockCounter(kind));
        this.#blockCounter.set(kind, newCounter);
        return newCounter;
    };
    decrementCounter = (kind: BlockKind) => {
        const newCounter = decrement(this.#getBlockCounter(kind));
        this.#blockCounter.set(kind, newCounter);
        return newCounter;
    };

    clear() {
        this.#blockCounter.clear();
    }
}

export default new BlockDatabase();
