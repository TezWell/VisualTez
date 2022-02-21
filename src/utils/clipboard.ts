import Logger from './logger';

/**
 * @description Identifies if the application is running on safari.
 */
export const usingSafari = () => !!navigator.vendor.match(/[Aa]pple/);

/**
 * @description Copy text to clipboard
 *
 * @param {string} text
 */
export const copyToClipboard = (text: string) => {
    if (navigator && navigator.clipboard && !usingSafari()) {
        navigator.clipboard.writeText(text);
    } else {
        Logger.warn("Your browser doesn't support clipboard API, using a legacy functionality.");
        LEGACY_copyToClipboard(text);
    }
};

const LEGACY_copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    document.body.appendChild(el);

    el.select();
    document.execCommand('copy');

    document.body.removeChild(el);
};
