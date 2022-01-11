import React from 'react';

import { CogIcon, PlayIcon } from '@heroicons/react/outline';

import useEditor from 'src/context/hooks/useEditor';
import { DrawerOptions } from 'src/context/Editor';

interface ToolsBarProps {
    compile: () => void;
    resizeWorkspace: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({ compile, resizeWorkspace }) => {
    const { updateDrawer } = useEditor();

    const onMenuSelection = (drawer?: DrawerOptions) => {
        switch (drawer) {
            case 'compilation':
                compile();
        }
        updateDrawer(drawer);
        setTimeout(resizeWorkspace, 100);
    };

    return (
        <div className="flex flex-col w-24 border-l border-black dark:border-white pt-5">
            <div className="flex-1 flex flex-col items-center justify-start">
                <button
                    onClick={() => onMenuSelection('compilation')}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-500 font-bold"
                >
                    <PlayIcon className="block" />
                    <p>Compile</p>
                </button>
            </div>
            <div className="h-20 flex flex-col items-center justify-start">
                <button
                    onClick={() => onMenuSelection('settings')}
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
