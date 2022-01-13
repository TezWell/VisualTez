import React from 'react';

interface CategoryProps {
    name: string;
    categorystyle?: string;
    custom?: string;
    type?: string;
}

export const Category: React.FC<CategoryProps> = ({ children, ...props }) => {
    return React.createElement('category', { ...props, is: 'blockly' }, children);
};

export default Category;
