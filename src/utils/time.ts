const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const getElapsedTime = (date: string): string => {
    let elapsedTimeString = '';
    try {
        const elapsedTime = Math.abs(Date.now() - new Date(date).getTime());
        // DAYS
        const days = Math.floor(elapsedTime / DAY);
        if (days) {
            elapsedTimeString += `${days}d`;
        }
        // HOURS
        const hours = Math.floor((elapsedTime % DAY) / HOUR);
        if (hours) {
            elapsedTimeString += `${elapsedTimeString.length > 0 ? ' ' : ''}`;
            elapsedTimeString += `${hours}h`;
        }
        // MINUTES
        const minutes = Math.floor(((elapsedTime % DAY) % HOUR) / MINUTE);
        if (minutes) {
            elapsedTimeString += `${elapsedTimeString.length > 0 ? ' ' : ''}`;
            elapsedTimeString += `${minutes}m`;
        }
        // SECONDS
        const seconds = Math.floor((((elapsedTime % DAY) % HOUR) % MINUTE) / SECOND);
        if (seconds) {
            elapsedTimeString += `${elapsedTimeString.length > 0 ? ' ' : ''}`;
            elapsedTimeString += `${seconds}s`;
        }
    } catch (e) {
        // INVALID DATE
    }

    return elapsedTimeString;
};

const time = {
    getElapsedTime,
};

export default time;
