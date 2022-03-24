import React from 'react';

interface BlockProps {
    type: string;
    tags?: string[];
}

export const Block: React.FC<BlockProps> = ({ children, ...props }) => {
    return React.createElement('block', { ...props, is: 'blockly' }, children);
};

export default Block;
