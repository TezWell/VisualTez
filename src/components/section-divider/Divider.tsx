import React from 'react';

interface DividerProps {
    index: number;
    split: 'vertical' | 'horizontal';
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
    onTouchStart?: (e: React.TouchEvent<HTMLDivElement>, index: number) => void;
}

const Divider: React.FC<DividerProps> = ({ split = 'vertical', index, onMouseDown, onTouchStart }) => {
    const dividerProps = {
        onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            onMouseDown && onMouseDown(event, index);
        },
        onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => {
            event.preventDefault();
            onTouchStart && onTouchStart(event, index);
        },
    };

    return split === 'vertical' ? (
        <div
            {...dividerProps}
            className="bg-current hover:bg-amber-400 hover:transition-all duration-200 ease-in-out w-1 cursor-col-resize select-none"
        />
    ) : (
        <div
            {...dividerProps}
            className="bg-current hover:bg-amber-400 hover:transition-all duration-200 ease-in-out w-full h-1 cursor-row-resize select-none"
        />
    );
};

export default Divider;
