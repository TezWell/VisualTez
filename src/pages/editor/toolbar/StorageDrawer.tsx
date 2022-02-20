import React from 'react';

import Button from 'src/components/common/Button';
import DrawerTitle from './DrawerTitle';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StorageDrawerProps {}

const StorageDrawer: React.FC<StorageDrawerProps> = () => {
    return (
        <div className="flex flex-col w-full h-full p-5">
            <DrawerTitle title="Storage" />

            <div className="flex grow justify-center items-center"></div>
            <Button className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 disabled:bg-yellow-500 disabled:border-yellow-700 p-2">
                Create new workplace
            </Button>
        </div>
    );
};

export default StorageDrawer;
