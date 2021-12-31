/**
 * @summary A debounce function that enforces a custom delay for the execution of a given function.
 * @param {number} delay - Execution delay (The function will only be executed after the provided delay has passed)
 * @return {Function} The callback function wrapped to only execute once per delay period.
 */
const debounce = (delay = 1000) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (callback: (...args: any[]) => void, ...args: any[]) => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            callback(...args);
        }, delay);
    };
};

export default debounce;
