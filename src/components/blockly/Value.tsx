import React from 'react';

interface ValueProps {
    children?: React.ReactNode;
    name: string;
}

export const Value: React.FC<ValueProps> = ({ children, ...props }) => {
    return React.createElement('value', { ...props, is: 'blockly' }, children);
};

export default Value;
