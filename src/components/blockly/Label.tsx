import React from 'react';

interface LabelProps {
    text: string;
    'web-class': string;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return React.createElement('label', { ...props, is: 'blockly' }, children);
};

export default Label;
