import React from 'react';

const NotFound = () => (
    <div className="flex-1 flex justify-center items-center">
        <svg viewBox="0 0 345 200" width={345} className="block">
            <text
                x="50%"
                y="50%"
                fontStyle="italic"
                fontWeight="bold"
                fontStretch="normal"
                fontSize="192px"
                fontFamily="sans-serif"
                letterSpacing="0px"
                fill="currentColor"
                fillOpacity="1"
                stroke="none"
                dominantBaseline="middle"
                textAnchor="middle"
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
