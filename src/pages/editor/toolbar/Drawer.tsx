import React from 'react';
import { Transition } from '@headlessui/react';
import useEditor from 'src/context/hooks/useEditor';
import CompilationDrawer from './CompilationDrawer';
import DoubleArrowRightIcon from 'src/components/common/icons/DoubleArrowRight';
import { DrawerKind } from 'src/context/Editor';
import SharingDrawer from './SharingDrawer';
import StorageDrawer from './StorageDrawer';
import SettingsDrawer from './SettingsDrawer';
import TemplatesDrawer from './TemplatesDrawer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DrawerProps {}

const Drawer: React.FC<DrawerProps> = ({}) => {
    const { drawer, updateDrawer } = useEditor();

    const onClose = () => {
        updateDrawer();
    };

    const content = React.useMemo(() => {
        switch (drawer) {
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
    }, [drawer]);

    if (!drawer) {
        return null;
    }

    return (
        <Transition.Root show={!!drawer} as={React.Fragment}>
            <div className="relative h-full w-96 border-l-4 border-black dark:border-white">
                <div className="absolute h-full w-full flex flex-col">
                    <Transition.Child
                        as={React.Fragment}
                        enter="transform transition ease-in-out duration-1000"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-100"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="flex-1 flex flex-col items-center bg-white dark:bg-black">{content}</div>
                    </Transition.Child>
                    <button
                        onClick={onClose}
                        className="flex items-center font-medium text-lg border-t-4 border-black dark:border-white p-2 hover:text-yellow-500"
                    >
                        Close <DoubleArrowRightIcon width={32} height={32} />
                    </button>
                </div>
            </div>
        </Transition.Root>
    );
};

export default Drawer;
