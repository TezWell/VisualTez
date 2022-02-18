import CryptoJS from 'crypto-js';

export const AES = {
    /**
     * AES encrypt function
     *
     * @param {string} content - Content to encrypt
     * @param {string} passPhrase - Pass Phrase used to encrypt the content
     * @return {String} Base64 representation of the ciphertext
     */
    encrypt: (content: string, passPhrase: string) => {
        return CryptoJS.AES.encrypt(content, passPhrase).toString();
    },
    /**
     * AES decrypt function
     *
     * @param {string} content - Encrypted content
     * @param {string} passPhrase - Pass Phrase used to decrypt the content
     * @return {String} decrypted content
     */
    decrypt: (encrypted: string, passPhrase: string) => {
        return CryptoJS.AES.decrypt(encrypted, passPhrase).toString(CryptoJS.enc.Utf8);
    },
};

const Crypto = {
    AES,
};

export default Crypto;
