import React from 'react';

interface SeparatorProps {
    children?: React.ReactNode;
    gap: number;
    cssContainer?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ children, cssContainer, ...props }) => {
    return React.createElement('sep', { ...props, 'css-container': cssContainer, is: 'blockly' }, children);
};

export default Separator;
