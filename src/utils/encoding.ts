/**
 * @description Convert an Uint32Array to hex.
 * @param buffer bytes
 * @returns {String}
 */
export const hexOfUint32Array = (buffer: Uint32Array) => {
    return Array.from(buffer, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
};
