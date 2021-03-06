import React from 'react';
import ThemeSelection from 'src/components/theme/selection';

import { EditorActionKind, EditorRenderer } from 'src/context/Editor';
import useEditor from 'src/context/hooks/useEditor';

import DrawerTitle from './DrawerTitle';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsDrawerProps {}

const SettingsDrawer: React.FC<SettingsDrawerProps> = () => {
    const { dispatch, state } = useEditor();

    const selectRenderer = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({
                type: EditorActionKind.UPDATE_RENDERER,
                payload: e.target.value as EditorRenderer,
            });
            window.location.reload();
        },
        [dispatch],
    );

    return (
        <div className="flex flex-col w-full h-full p-5">
            <DrawerTitle title="Settings" />
            <div className="mt-5 mb-5" />
            <div className="relative flex justify-between items-center">
                <label className="block text-sm font-medium">Theme mode</label>
                <ThemeSelection />
            </div>
            <div className="border mt-5 mb-5 w-full" />
            <div className="relative flex justify-between items-center">
                <label className="block text-sm font-medium">Block Renderer</label>

                <select
                    name="editor-renderer"
                    value={state.renderer}
                    onChange={selectRenderer}
                    className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 dark:text-black"
                >
                    {Object.entries(EditorRenderer).map(([key, value]) => (
                        <option key={value}>{key}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SettingsDrawer;
