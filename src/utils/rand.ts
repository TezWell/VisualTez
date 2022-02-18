import { hexOfUint32Array } from './encoding';

/**
 * Generate a random string.
 *
 * @return {string} a random string
 */
export const generateRandomString = () => {
    const randomBuffer = window.crypto
        .getRandomValues(new Uint32Array(10))
        .reduce((prev, cur) => [...prev, cur], [] as number[]);
    return hexOfUint32Array(Uint32Array.from(randomBuffer));
};
