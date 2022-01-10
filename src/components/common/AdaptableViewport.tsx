import React from 'react';

const updateViewport = (content: string) => {
    if (document.getElementById('viewport-meta')?.getAttribute('content') !== content) {
        document.getElementById('viewport-meta')?.setAttribute('content', content);
    }
};

interface AdaptableViewportProps {
    minSize: number;
}

const AdaptableViewport: React.FC<AdaptableViewportProps> = ({ children, minSize }) => {
    React.useEffect(() => {
        const onResize = () => {
            if (window.screen.width < minSize) {
                updateViewport(`width=${minSize}`);
            } else {
                updateViewport('width=device-width, initial-scale=1');
            }
        };
        onResize();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            updateViewport('width=device-width, initial-scale=1');
        };
    }, [minSize]);

    return <>{children}</>;
};

export default AdaptableViewport;
