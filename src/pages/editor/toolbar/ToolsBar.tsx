import React from 'react';

import { CogIcon, PlayIcon, ShareIcon, ArchiveIcon } from '@heroicons/react/outline';

import useEditor from 'src/context/hooks/useEditor';
import { DrawerKind } from 'src/context/Editor';

interface ToolsBarProps {
    compile: () => void;
    resizeWorkspace: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({ compile, resizeWorkspace }) => {
    const { updateDrawer } = useEditor();

    const onMenuSelection = (drawer?: DrawerKind) => {
        switch (drawer) {
            case DrawerKind.Compilation:
                compile();
        }
        updateDrawer(drawer);
        setTimeout(resizeWorkspace, 100);
    };

    return (
        <div className="flex flex-col w-24 border-l border-black dark:border-white">
            <div className="flex-1 flex flex-col items-center justify-start pt-5">
                <button
                    onClick={() => onMenuSelection(DrawerKind.Compilation)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-500 font-bold"
                >
                    <PlayIcon className="block" />
                    <p>Compile</p>
                </button>
            </div>
            <div className="flex flex-col items-center justify-start pb-5">
                <button
                    onClick={() => onMenuSelection(DrawerKind.Share)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-500 font-bold"
                >
                    <ShareIcon className="block" />
                    <p>Share</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Storage)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-500 font-bold"
                >
                    <ArchiveIcon className="block" />
                    <p>Storage</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Settings)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-500 font-bold"
                >
                    <CogIcon className="block" />
                    <p>Settings</p>
                </button>
            </div>
        </div>
    );
};

export default ToolsBar;
