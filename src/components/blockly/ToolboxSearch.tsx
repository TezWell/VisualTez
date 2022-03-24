import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ToolboxSearchProps {}

export const ToolboxSearch: React.FC<ToolboxSearchProps> = ({ children, ...props }) => {
    return React.createElement('toolboxsearch', { ...props, is: 'blockly' }, children);
};

export default ToolboxSearch;
