import React from 'react';

import { CogIcon, PlayIcon, ShareIcon, ArchiveBoxIcon, BookOpenIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { RectangleGroupIcon } from '@heroicons/react/24/solid';

import useEditor from 'src/context/hooks/useEditor';
import { DrawerKind, EditorActionKind } from 'src/context/Editor';

import pkg from 'src/../package.json';
import { Link } from 'react-router-dom';

interface ToolsBarProps {
    compile: () => void;
    resizeWorkspace: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({ compile, resizeWorkspace }) => {
    const { state, workspace, dispatch } = useEditor();

    const onMenuSelection = (drawer?: DrawerKind) => {
        dispatch({
            type: EditorActionKind.UPDATE_DRAWER,
            payload: drawer,
        });
    };

    React.useEffect(() => {
        if ([DrawerKind.Compilation, DrawerKind.Tests].includes(state.drawer!)) {
            compile();
        }
        setTimeout(resizeWorkspace, 100);
    }, [state.drawer]);

    return (
        <div className="flex flex-col w-24 border-l border-black dark:border-white">
            <div className="flex-1 flex flex-col items-center justify-start pt-5">
                <button
                    onClick={() => onMenuSelection(DrawerKind.Compilation)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <PlayIcon className="block" />
                    <p>Compile</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    disabled={!(workspace.xml || '').includes('<block type="test"')}
                    onClick={() => onMenuSelection(DrawerKind.Tests)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold disabled:opacity-75 disabled:text-current"
                >
                    <BeakerIcon className="block" />
                    <p>Tests</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
            </div>
            <div className="flex flex-col items-center justify-start ">
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Templates)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <RectangleGroupIcon className="block" />
                    <p>Templates</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Share)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <ShareIcon className="block" />
                    <p>Share</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Storage)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <ArchiveBoxIcon className="block" />
                    <p>Storage</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <button
                    onClick={() => onMenuSelection(DrawerKind.Settings)}
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <CogIcon className="block" />
                    <p>Settings</p>
                </button>
                <div className="border mt-5 mb-5 w-20" />
                <a
                    href="/docs"
                    target="_blank"
                    className="w-14 h-14 flex flex-col items-center justify-center hover:text-yellow-400 active:text-yellow-500 font-bold"
                >
                    <BookOpenIcon className="block" />
                    <p>Docs</p>
                </a>
                <div className="border mt-5 mb-2 w-20" />
                <Link to="/releases">v{pkg.version}</Link>
            </div>
        </div>
    );
};

export default ToolsBar;
