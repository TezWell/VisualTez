import React from 'react';

import './Spinner.css';

interface CircularLoadingProps {
    message?: string;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({ message = 'LOADING...' }) => (
    <div className="flex-1 flex justify-center items-center">
        <div className="relative h-64 w-64 flex justify-center items-center">
            <div className="spin_animation absolute h-3/6 w-3/6 border-4 border-amber-500 border-solid rounded-full border-l-transparent border-r-transparent" />
            <div className="spin_animation_inverted absolute h-4/6 w-4/6 border-4 border-black dark:border-white rounded-full border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent" />
            <div className="spin_animation absolute h-5/6 w-5/6 border-4 border-amber-500 border-solid rounded-full border-l-transparent border-r-transparent" />
            <div className="spin_animation_inverted absolute h-full w-full border-4 border-black dark:border-white border-solid rounded-full border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent" />

            <span className="relative font-bold text-black dark:text-white">{message}</span>
        </div>
    </div>
);

export default CircularLoading;
