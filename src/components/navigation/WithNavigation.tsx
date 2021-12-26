import React from 'react';
import Navigation from '.';

const WithNavigation: React.FC = ({ children }) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

export default WithNavigation;
