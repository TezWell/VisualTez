import React from 'react';

interface CategoryIconProps {
    children?: React.ReactNode;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ children, ...props }) => {
    return React.createElement('categoryicon', { ...props, is: 'blockly' }, children);
};

export default CategoryIcon;
