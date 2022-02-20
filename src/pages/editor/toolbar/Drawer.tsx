import React from 'react';
import { Transition } from '@headlessui/react';
import useEditor from 'src/context/hooks/useEditor';
import CompilationDrawer from './CompilationDrawer';
import DoubleArrowRightIcon from 'src/components/common/icons/DoubleArrowRight';
import DrawerTitle from './DrawerTitle';
import { DrawerKind } from 'src/context/Editor';
import SharingDrawer from './SharingDrawer';
import StorageDrawer from './StorageDrawer';

interface DrawerProps {
    resizeWorkspace: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ resizeWorkspace }) => {
    const { drawer, updateDrawer } = useEditor();

    const onClose = () => {
        updateDrawer();
        setTimeout(resizeWorkspace, 100);
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
                return (
                    <div className="flex flex-col w-full h-full p-5">
                        <DrawerTitle title="Settings" />
                    </div>
                );
        }
        return null;
    }, [drawer]);

    return (
        <Transition.Root show={!!drawer} as={React.Fragment}>
            <div className="relative h-full w-full flex flex-col justify-between">
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
                <button onClick={onClose} className="border-t-2 p-2 hover:text-yellow-500">
                    <DoubleArrowRightIcon width={32} height={32} />
                </button>
            </div>
        </Transition.Root>
    );
};

export default Drawer;
