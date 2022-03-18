import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import {
    CompilationKind,
    ContractCompilation,
    filterCompilationKind,
    TypeCompilation,
    ValueCompilation,
} from 'src/blocks';
import CodeBlock from 'src/components/CodeBlock';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import useEditor from 'src/context/hooks/useEditor';
import useDeployment from 'src/context/hooks/useDeployment';
import { buildClassName } from 'src/utils/className';
import Logger from 'src/utils/logger';
import { DeploymentActionKind } from 'src/context/Deployment';
import ConditionalRender from 'src/components/common/ConditionalRender';

interface ContractModalProps {
    gotoDeployment: (compilation: ContractCompilation) => void;
    compilation: ContractCompilation;
    onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ gotoDeployment, compilation, ...props }) => {
    const isOpen = React.useMemo(() => !!compilation, [compilation]);

    const storageJSON = React.useMemo(() => {
        try {
            if (compilation) {
                return JSON.stringify(compilation.result.storage.toJSON(), null, 2);
            }
        } catch (e: any) {
            Logger.debug(e);
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
                    key="deploy"
                    onClick={() => gotoDeployment(compilation)}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Deploy
                </Button>,
                <Button
                    key="close"
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
                            buildClassName([
                                {
                                    classes:
                                        'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                },
                                {
                                    classes: 'bg-gray-100 shadow',
                                    append: selected,
                                },
                                {
                                    classes: 'hover:bg-opacity-40',
                                    append: !selected,
                                },
                            ])
                        }
                    >
                        Storage
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            buildClassName([
                                {
                                    classes:
                                        'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                },
                                {
                                    classes: 'bg-gray-100 shadow',
                                    append: selected,
                                },
                                {
                                    classes: 'hover:bg-opacity-40',
                                    append: !selected,
                                },
                            ])
                        }
                    >
                        Code
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

interface TypeModalProps {
    compilation: TypeCompilation | ValueCompilation;
    onClose: () => void;
}

const TypeValueModal: React.FC<TypeModalProps> = ({ compilation, ...props }) => {
    const isOpen = React.useMemo(() => !!compilation, [compilation]);

    const michelsonJSON = React.useMemo(() => {
        try {
            if (compilation) {
                return JSON.stringify(compilation.result.json, null, 2);
            }
        } catch (e: any) {
            Logger.debug(e);
            return e.message;
        }
    }, [compilation]);

    return (
        <Modal
            {...props}
            open={isOpen}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    {compilation.kind === CompilationKind.Type ? 'Type' : 'Value'}{' '}
                    <p className="ml-2 font-bold">{compilation?.result.name}</p>
                </div>
            }
            actions={[
                <Button
                    key="close"
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
                            buildClassName([
                                {
                                    classes:
                                        'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                },
                                {
                                    classes: 'bg-gray-100 shadow',
                                    append: selected,
                                },
                                {
                                    classes: 'hover:bg-opacity-40',
                                    append: !selected,
                                },
                            ])
                        }
                    >
                        Michelson JSON
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            buildClassName([
                                {
                                    classes:
                                        'w-full p-2 text-sm leading-5 font-medium bg-gray-500 bg-opacity-10 dark:text-white',
                                },
                                {
                                    classes: 'bg-gray-100 shadow',
                                    append: selected,
                                },
                                {
                                    classes: 'hover:bg-opacity-40',
                                    append: !selected,
                                },
                            ])
                        }
                    >
                        Micheline
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex-1 overflow-y-auto">
                    <Tab.Panel className="h-full">
                        <CodeBlock withCopy language={'json'} showLineNumbers text={michelsonJSON} />
                    </Tab.Panel>
                    <Tab.Panel className="h-full">
                        <CodeBlock
                            withCopy
                            language={'json'}
                            showLineNumbers
                            text={compilation?.result.micheline || ''}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Modal>
    );
};

interface ExpandButtonProps {
    selected: boolean;
    select: () => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ selected, select }) => (
    <button className="hover:text-yellow-500 pl-5 pr-5" onClick={select}>
        {selected ? (
            <ChevronUpIcon className="block" width={32} height={32} />
        ) : (
            <ChevronDownIcon className="block" width={32} height={32} />
        )}
    </button>
);

interface TabInfoProps {
    title: string;
    items: number;
}

const TabInfo: React.FC<TabInfoProps> = ({ title, items }) => (
    <div className="flex items-center justify-between w-full">
        <h1 className="font-mono text-ellipsis overflow-hidden">{title}</h1>
        <span className="ml-2 pr-4 pl-4 font-mono border rounded-full text-yellow-400 border-yellow-400">{items}</span>
    </div>
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CompilationDrawerProps {}

const CompilationDrawer: React.FC<CompilationDrawerProps> = () => {
    const navigate = useNavigate();
    const [tab, setTab] = React.useState<CompilationKind | null>();
    const [contractCompilation, setContractCompilation] = React.useState<ContractCompilation>();
    const [typeValueCompilation, setTypeValueCompilation] = React.useState<TypeCompilation | ValueCompilation>();
    const { compilations } = useEditor();
    const { dispatch: deploymentDispatch } = useDeployment();

    const contractCompilations = React.useMemo(
        () => compilations.filter(filterCompilationKind<ContractCompilation>(CompilationKind.Contract)),
        [compilations],
    );

    const valueCompilations = React.useMemo(
        () => compilations.filter(filterCompilationKind<ValueCompilation>(CompilationKind.Value)),
        [compilations],
    );

    const typeCompilations = React.useMemo(
        () => compilations.filter(filterCompilationKind<TypeCompilation>(CompilationKind.Type)),
        [compilations],
    );

    const selectedTab = React.useMemo(() => {
        if (tab) {
            return tab;
        } else if (contractCompilations.length) {
            return CompilationKind.Contract;
        } else if (typeCompilations.length) {
            return CompilationKind.Type;
        } else if (valueCompilations.length) {
            return CompilationKind.Value;
        }
        return CompilationKind.Contract;
    }, [contractCompilations.length, tab, typeCompilations.length, valueCompilations.length]);

    function closeContractCompilationModal() {
        setContractCompilation(undefined);
    }

    function openContractCompilationModal(compilation: ContractCompilation) {
        setContractCompilation(compilation);
    }

    function closeTypeValueCompilationModal() {
        setTypeValueCompilation(undefined);
    }

    function openTypeValueCompilationModal(compilation: TypeCompilation | ValueCompilation) {
        setTypeValueCompilation(compilation);
    }

    function onTabSelection(kind: CompilationKind) {
        setTab((t) => (t === kind ? null : kind));
    }

    const gotoDeployment = React.useCallback(
        (compilation: ContractCompilation) => {
            deploymentDispatch({
                type: DeploymentActionKind.UPDATE_STATE,
                payload: {
                    storageXML: compilation.result.storageXML,
                    code: compilation.result.code,
                },
            });
            navigate('/deploy');
        },
        [deploymentDispatch, navigate],
    );

    return (
        <div className="flex-1 flex h-full w-full flex-col justify-stretch">
            <div className="flex items-center justify-between p-5">
                <TabInfo title="Contracts" items={contractCompilations.length} />
                <ExpandButton
                    selected={selectedTab === CompilationKind.Contract}
                    select={() => onTabSelection(CompilationKind.Contract)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== CompilationKind.Contract,
                    },
                    {
                        classes: 'grow basis-0 border-t p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400',
                    },
                ])}
            >
                {contractCompilations.map((compilation) => (
                    <div
                        key={compilation.result.name}
                        className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                    >
                        <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                            <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                        </div>
                        <Button
                            fullWidth
                            onClick={() => openContractCompilationModal(compilation)}
                            className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-1"
                        >
                            Show Contract
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => gotoDeployment(compilation)}
                            className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-1"
                        >
                            Deploy Contract
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between border-t p-5">
                <TabInfo title="Values" items={valueCompilations.length} />
                <ExpandButton
                    selected={selectedTab === CompilationKind.Value}
                    select={() => onTabSelection(CompilationKind.Value)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== CompilationKind.Value,
                    },
                    {
                        classes: 'grow basis-0 border-t p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400',
                    },
                ])}
            >
                {valueCompilations.map((compilation) => (
                    <div
                        key={compilation.result.name}
                        className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                    >
                        <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                            <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                        </div>
                        <Button
                            fullWidth
                            onClick={() => openTypeValueCompilationModal(compilation)}
                            className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-1"
                        >
                            Show
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between p-5 border-b border-t">
                <TabInfo title="Types" items={typeCompilations.length} />
                <ExpandButton
                    selected={selectedTab === CompilationKind.Type}
                    select={() => onTabSelection(CompilationKind.Type)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== CompilationKind.Type,
                    },
                    {
                        classes: 'grow basis-0 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400',
                    },
                ])}
            >
                {typeCompilations.map((compilation) => (
                    <div
                        key={compilation.result.name}
                        className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                    >
                        <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                            <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                        </div>
                        <Button
                            fullWidth
                            onClick={() => openTypeValueCompilationModal(compilation)}
                            className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-1"
                        >
                            Show
                        </Button>
                    </div>
                ))}
            </div>

            <ConditionalRender
                props={{
                    compilation: contractCompilation,
                }}
            >
                {(props) => (
                    <ContractModal gotoDeployment={gotoDeployment} onClose={closeContractCompilationModal} {...props} />
                )}
            </ConditionalRender>
            <ConditionalRender
                props={{
                    compilation: typeValueCompilation,
                }}
            >
                {(props) => <TypeValueModal onClose={closeTypeValueCompilationModal} {...props} />}
            </ConditionalRender>
        </div>
    );
};

export default CompilationDrawer;
