import React from 'react';

interface ShadowProps {
    children?: React.ReactNode;
    type: string;
}

export const Shadow: React.FC<ShadowProps> = ({ children, ...props }) => {
    return React.createElement('shadow', { ...props, is: 'blockly' }, children);
};

export default Shadow;
