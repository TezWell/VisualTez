import React from 'react';

interface FieldProps {
    name: string;
}

export const Field: React.FC<FieldProps> = ({ children, ...props }) => {
    return React.createElement('field', { ...props, is: 'blockly' }, children);
};

export default Field;
