import React from 'react';

export interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, className = '', ...props }) => {
    const classNames = React.useMemo(() => {
        let classNames = `font-bold text-black dark:text-white border-b-4 rounded disabled:opacity-75 ${className}`;

        if (fullWidth) {
            classNames += ' w-full';
        }

        return classNames;
    }, [className, fullWidth]);

    return (
        <button type="button" className={classNames} {...props}>
            {children}
        </button>
    );
};

export default Button;
