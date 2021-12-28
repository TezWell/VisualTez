import React from 'react';
import { Link } from 'react-router-dom';

interface RouterButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    to: string;
}

const RouterButton: React.FC<RouterButtonProps> = ({ children, to, ...props }) => (
    <Link to={to}>
        <button {...props}>{children}</button>
    </Link>
);

export default RouterButton;
