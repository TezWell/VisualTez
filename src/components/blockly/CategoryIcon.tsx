import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CategoryIconProps {}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ children, ...props }) => {
    return React.createElement('categoryicon', { ...props, is: 'blockly' }, children);
};

export default CategoryIcon;
