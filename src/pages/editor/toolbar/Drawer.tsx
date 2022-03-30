import React from 'react';

import useEditor from 'src/context/hooks/useEditor';
import CompilationDrawer from './CompilationDrawer';
import DoubleArrowRightIcon from 'src/components/common/icons/DoubleArrowRight';
import { DrawerKind, EditorActionKind } from 'src/context/Editor';
import SharingDrawer from './SharingDrawer';
import StorageDrawer from './StorageDrawer';
import SettingsDrawer from './SettingsDrawer';
import TemplatesDrawer from './TemplatesDrawer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DrawerProps {}

const Drawer: React.FC<DrawerProps> = () => {
    const { state, dispatch } = useEditor();

    const onClose = () => {
        dispatch({
            type: EditorActionKind.UPDATE_DRAWER,
        });
    };

    const content = React.useMemo(() => {
        switch (state.drawer) {
            case DrawerKind.Compilation:
                return <CompilationDrawer />;
            case DrawerKind.Share:
                return <SharingDrawer />;
            case DrawerKind.Storage:
                return <StorageDrawer />;
            case DrawerKind.Settings:
                return <SettingsDrawer />;
            case DrawerKind.Templates:
                return <TemplatesDrawer />;
        }
        return null;
    }, [state.drawer]);

    if (!state.drawer) {
        return null;
    }

    return (
        <div className="relative h-full w-96 border-l-4 border-black dark:border-white">
            <div className="absolute h-full w-full flex flex-col">
                <div className="flex-1 flex flex-col items-center bg-white dark:bg-black">{content}</div>
                <button
                    onClick={onClose}
                    className="flex items-center font-medium text-lg border-t-4 border-black dark:border-white p-2 hover:text-yellow-500"
                >
                    Close <DoubleArrowRightIcon width={32} height={32} />
                </button>
            </div>
        </div>
    );
};

export default Drawer;
