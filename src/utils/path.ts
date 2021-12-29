export const getBaseURL = (): string => process.env.PUBLIC_URL || '/';

export const resolvePath = (postfix: string) => `${getBaseURL()}${postfix}`.replace(/\/\//g, '/');

const path = {
    getBaseURL,
};

export default path;
