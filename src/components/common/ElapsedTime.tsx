import React from 'react';

import { getElapsedTime } from 'src/utils/time';

interface Props {
    timestamp: string;
}

const ElapsedTime: React.FC<Props> = ({ timestamp }) => {
    const isMounted = React.useRef(false);
    const [elapsedTime, setElapsedTime] = React.useState(getElapsedTime(timestamp));

    React.useEffect(() => {
        setTimeout(() => {
            if (isMounted.current) {
                setElapsedTime(getElapsedTime(timestamp));
            }
        }, 1000);
    });

    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return <>{elapsedTime} ago</>;
};

export default ElapsedTime;
