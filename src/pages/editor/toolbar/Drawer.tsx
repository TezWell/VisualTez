import React from 'react';
import { Transition } from '@headlessui/react';
import useEditor from 'src/context/hooks/useEditor';
import CodeBlock from 'src/components/CodeBlock';

const DrawerTitle = ({ title }: { title: string }) => (
    <h1 className="text-xl text-center align-middle font-mono border pt-1 pb-1 rounded-full">{title}</h1>
);

interface DrawerProps {
    compilationResults?: string;
}

const Drawer: React.FC<DrawerProps> = ({ compilationResults }) => {
    const { drawer } = useEditor();

    const content = React.useMemo(() => {
        switch (drawer) {
            case 'compilation':
                return (
                    <div className="flex flex-col w-full h-full">
                        <DrawerTitle title="Compilation" />
                        <div className="flex items-center justify-center mt-10">
                            {compilationResults && (
                                <CodeBlock language="json" showLineNumbers text={compilationResults} />
                            )}
                        </div>
                    </div>
                );
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
            <div className="relative h-full w-full">
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
            </div>
        </Transition.Root>
    );
};

export default Drawer;
