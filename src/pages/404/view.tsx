import React from 'react';

const NotFound = () => (
    <div className="flex-1 flex justify-center items-center">
        <svg viewBox="0 0 345 200" width={345} className="block">
            <text
                x="50%"
                y="50%"
                font-style="italic"
                font-weight="bold"
                font-stretch="normal"
                font-size="192px"
                font-family="sans-serif"
                letter-spacing="0px"
                fill="currentColor"
                fill-opacity="1"
                stroke="none"
                dominant-baseline="middle"
                text-anchor="middle"
            >
                404
            </text>
        </svg>
        <p>
            Page <b className="italic tracking-wider">{window.location.pathname}</b> does not exist!
        </p>
    </div>
);

export default NotFound;
