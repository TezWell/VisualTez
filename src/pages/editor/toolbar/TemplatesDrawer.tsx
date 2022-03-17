import React from 'react';
import DrawerTitle from './DrawerTitle';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TemplatesDrawerProps {}

const TemplatesDrawer: React.FC<TemplatesDrawerProps> = () => {
    return (
        <div className="flex flex-col w-full h-full p-5">
            <DrawerTitle title="Templates" />
        </div>
    );
};

export default TemplatesDrawer;
