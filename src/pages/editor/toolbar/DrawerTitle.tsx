import React from 'react';

interface DrawerTitleProps {
    title: string;
}

const DrawerTitle: React.FC<DrawerTitleProps> = ({ title }) => (
    <h1 className="text-xl text-center align-middle font-mono border p-1 rounded-full text-ellipsis overflow-hidden">
        {title}
    </h1>
);

export default DrawerTitle;
