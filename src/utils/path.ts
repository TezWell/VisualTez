export const getBaseURL = (): string => process.env.PUBLIC_URL || '/';

const path = {
    getBaseURL,
};

export default path;
