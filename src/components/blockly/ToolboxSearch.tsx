import React from 'react';

interface ToolboxSearchProps {
    children?: React.ReactNode;
}

export const ToolboxSearch: React.FC<ToolboxSearchProps> = ({ children, ...props }) => {
    return React.createElement('toolboxsearch', { ...props, is: 'blockly' }, children);
};

export default ToolboxSearch;
