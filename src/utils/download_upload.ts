/**
 * Create a file object with raw content and download it.
 *
 * @param fileName The name of the file being downloaded.
 * @param data The content of the file being downloaded.
 *
 * @returns void
 */
export const downloadFile = (fileName: string, data: string): void => {
    const el = window.document.createElement('a');
    el.download = fileName;
    el.href = window.URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    document.body.appendChild(el);
    // Start download
    el.click();
    // Teardown
    document.body.removeChild(el);
};
