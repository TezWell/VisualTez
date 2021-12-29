import React from 'react';

type EmailIconProps = Exclude<React.SVGProps<SVGSVGElement>, 'viewBox'>;

const EmailIcon: React.FC<EmailIconProps> = ({ width = 24, height = 24, ...props }) => (
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
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        />
    </svg>
);

export default EmailIcon;
