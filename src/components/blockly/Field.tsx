import React from 'react';

interface FieldProps {
    type: string;
}

export const Field: React.FC<FieldProps> = ({ children, ...props }) => {
    return React.createElement('field', { ...props, is: 'blockly' }, children);
};

export default Field;
