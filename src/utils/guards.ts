export const notNull = <T>(el: T): el is Exclude<T, null> => !!el;

const Guards = {
    notNull,
};

export default Guards;
