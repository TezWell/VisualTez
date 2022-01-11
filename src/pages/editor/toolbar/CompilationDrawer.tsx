import React from 'react';
import { Tab } from '@headlessui/react';

import { ContactCompilation, isContractCompilation } from 'src/blocks';
import CodeBlock from 'src/components/CodeBlock';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import useEditor from 'src/context/hooks/useEditor';
import DrawerTitle from './DrawerTitle';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface ContractModalProps {
    compilation?: ContactCompilation;
    onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ compilation, ...props }) => {
    const isOpen = React.useMemo(() => !!compilation, [compilation]);

    const storageJSON = React.useMemo(() => {
        try {
            if (compilation) {
                return JSON.stringify(compilation.result.storage.toJSON(), null, 2);
            }
        } catch (e: any) {
            console.debug(e);
            return e.message;
        }
    }, [compilation]);

    return (
        <Modal
            {...props}
            open={isOpen}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Contract <p className="ml-2 font-bold">{compilation?.result.name}</p>
                </div>
            }
            actions={[
                <Button
                    disabled
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 disabled:bg-yellow-500 disabled:border-yellow-700 p-2"
                >
                    Deploy (In Progress)
                </Button>,
                <Button
                    onClick={props.onClose}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <Tab.Group as="div" className="flex-1 h-full flex flex-col">
                <Tab.List className="flex border-t border-b border-blue-400">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                selected ? 'bg-gray-100 shadow' : 'hover:bg-opacity-40',
                            )
                        }
                    >
                        Code
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                selected ? 'bg-gray-100 shadow' : 'hover:bg-opacity-40',
                            )
                        }
                    >
                        Storage
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex-1 overflow-y-auto">
                    <Tab.Panel className="h-full">
                        <CodeBlock withCopy language={'json'} showLineNumbers text={storageJSON} />
                    </Tab.Panel>
                    <Tab.Panel className="h-full">
                        <CodeBlock withCopy language={'json'} showLineNumbers text={compilation?.result.code || ''} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Modal>
    );
};

interface CompilationDrawerProps {
    compilationResults?: string;
}

const CompilationDrawer: React.FC<CompilationDrawerProps> = ({ compilationResults }) => {
    const [compilation, setCompilation] = React.useState<ContactCompilation>();
    const { compilations } = useEditor();

    function closeModal() {
        setCompilation(undefined);
    }

    function openModal(compilation: ContactCompilation) {
        setCompilation(compilation);
    }

    return (
        <div className="flex w-full flex-col flex-1 justify-stretch">
            <DrawerTitle title="Compilation" />
            <div className="flex-1 overflow-auto p-3 scrollbar-thin scrollbar-thumb-gray-400">
                {compilations.filter(isContractCompilation).map((compilation) => (
                    <div
                        key={compilation.result.name}
                        className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                    >
                        <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                            <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                        </div>
                        <Button
                            fullWidth
                            onClick={() => openModal(compilation)}
                            className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-1"
                        >
                            Show
                        </Button>
                        <Button
                            disabled
                            fullWidth
                            className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 disabled:bg-yellow-500 disabled:border-yellow-700 p-1"
                        >
                            Deploy (In Progress)
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center mt-10">
                {compilationResults && <CodeBlock language="json" showLineNumbers text={compilationResults} />}
            </div>

            <ContractModal compilation={compilation} onClose={closeModal} />
        </div>
    );
};

export default CompilationDrawer;
