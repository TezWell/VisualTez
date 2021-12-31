export const notNull = <T>(el?: T): el is T => !!el;

const Guards = {
    notNull,
};

export default Guards;
