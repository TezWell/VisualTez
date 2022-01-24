import React from 'react';

type GlobeIconProps = Exclude<React.SVGProps<SVGSVGElement>, 'viewBox'>;

const GlobeIcon: React.FC<GlobeIconProps> = ({ width = 24, height = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        className="block"
        {...props}
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
    </svg>
);

export default GlobeIcon;
