import React from 'react';

type DoubleArrowRightIconProps = Exclude<React.SVGProps<SVGSVGElement>, 'viewBox'>;

const DoubleArrowRightIcon: React.FC<DoubleArrowRightIconProps> = ({ width = 24, height = 24, ...props }) => (
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);

export default DoubleArrowRightIcon;
