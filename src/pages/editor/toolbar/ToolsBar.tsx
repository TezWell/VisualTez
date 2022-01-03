import React from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { CogIcon, PlayIcon } from '@heroicons/react/outline';
import Blockly from 'blockly';

import useEditor from 'src/context/hooks/useEditor';
import debounce from 'src/utils/debounce';
import { DrawerOptions } from 'src/context/Editor';

// Debouncer
const onDebouncer = debounce(10);
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
        onDebouncer(resizeWorkspace);
    };

    return (
        <div className="flex flex-col w-24 border-l border-black dark:border-white pt-5">
            <div className="flex-1 flex flex-col items-center justify-start">
                <button
                    onClick={() => onMenuSelection('compilation')}
                    className="mx-auto w-20 h-20 flex flex-col items-center justify-center"
                >
                    <PlayIcon className="block w-8 h-8 hover:w-9 hover:h-9 hover:text-yellow-500" /> Compile
                </button>
            </div>
            <div className="items-start justify-center ">
                <button
                    onClick={() => onMenuSelection('settings')}
                    className="mx-auto w-20 h-20 flex flex-col items-center justify-center"
                >
                    <CogIcon className="block w-8 h-8 hover:w-9 hover:h-9 hover:text-yellow-500" /> Settings
                </button>
            </div>
        </div>
    );
};

export default ToolsBar;
