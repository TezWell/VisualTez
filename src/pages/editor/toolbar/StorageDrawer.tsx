import React from 'react';

import Button from 'src/components/common/Button';
import useEditor from 'src/context/hooks/useEditor';
import DrawerTitle from './DrawerTitle';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StorageDrawerProps {}

const StorageDrawer: React.FC<StorageDrawerProps> = () => {
    const { state } = useEditor();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-5">
                <DrawerTitle title="Storage" />
            </div>

            <div className="flex flex-col grow basis-0 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                {Object.values(state.workspaces).map((workspace) => (
                    <div className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white">
                        <h1 className="text-xs truncate font-mono text-ellipsis overflow-hidden w-32">
                            {workspace.name}
                        </h1>
                    </div>
                ))}
            </div>

            <div className="p-5">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 disabled:bg-yellow-500 disabled:border-yellow-700 p-2">
                    Create new workplace
                </Button>
            </div>
        </div>
    );
};

export default StorageDrawer;
