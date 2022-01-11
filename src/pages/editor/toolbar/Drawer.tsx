import React from 'react';
import { Transition } from '@headlessui/react';
import useEditor from 'src/context/hooks/useEditor';
import CompilationDrawer from './CompilationDrawer';
import DoubleArrowRightIcon from 'src/components/common/icons/DoubleArrowRight';
import DrawerTitle from './DrawerTitle';

interface DrawerProps {
    compilationResults?: string;
    resizeWorkspace: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ compilationResults, resizeWorkspace }) => {
    const { drawer, updateDrawer } = useEditor();

    const onClose = () => {
        updateDrawer();
        setTimeout(resizeWorkspace, 100);
    };

    const content = React.useMemo(() => {
        switch (drawer) {
            case 'compilation':
                return <CompilationDrawer compilationResults={compilationResults} />;
            case 'settings':
                return (
                    <div className="flex flex-col w-full h-full">
                        <DrawerTitle title="Settings" />
                    </div>
                );
        }
        return null;
    }, [compilationResults, drawer]);

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
                    <div className="flex flex-col items-center p-5 bg-white dark:bg-black">{content}</div>
                </Transition.Child>
                <button onClick={onClose} className="border-t-2 p-2 hover:text-yellow-500">
                    <DoubleArrowRightIcon width={32} height={32} />
                </button>
            </div>
        </Transition.Root>
    );
};

export default Drawer;
