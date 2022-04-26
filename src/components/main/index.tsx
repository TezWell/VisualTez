import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => <main className="flex flex-col flex-1">{children}</main>;

export default Main;
