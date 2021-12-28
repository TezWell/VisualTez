import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainProps {}

const Main: React.FC<MainProps> = ({ children }) => <main className="flex flex-col flex-1">{children}</main>;

export default Main;
