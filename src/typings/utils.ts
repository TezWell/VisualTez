/**
 * @description Make U properties in T optional
 * @typeParam T - Object
 * @typeParam U - Object keys
 */
export type SelectivePartial<T, U extends keyof T> = Omit<T, U> & Partial<Omit<T, Exclude<keyof T, U>>>;
