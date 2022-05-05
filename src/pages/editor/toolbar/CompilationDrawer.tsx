import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Tab } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

import {
    ContractCompilation,
    filterCompilationKind,
    Target,
    TestCompilation,
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
import TestModal from './modal/TestModal';
import { isDevelopment } from 'src/utils';

interface JSONOrMichelineSwitchProps {
    showMicheline: boolean;
    onSwitch: () => void;
}

const JSONOrMichelineSwitch: React.FC<JSONOrMichelineSwitchProps> = ({ showMicheline, onSwitch }) => (
    <div className="flex justify-center items-center p-2">
        <p className="mr-2 text-md font-medium text-black dark:text-white">JSON</p>
        <Switch
            checked={showMicheline}
            onChange={onSwitch}
            className={buildClassName([
                {
                    classes:
                        'inline-flex flex-shrink-0 h-[28px] w-[56px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-0',
                    append: true,
                },
                {
                    classes: 'bg-yellow-600',
                    append: showMicheline,
                },
                {
                    classes: 'bg-yellow-600',
                    append: !showMicheline,
                },
            ])}
        >
            <span
                aria-hidden="true"
                className={buildClassName([
                    {
                        classes:
                            'pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200',
                        append: true,
                    },
                    {
                        classes: 'translate-x-7',
                        append: showMicheline,
                    },
                    {
                        classes: 'translate-x-0',
                        append: !showMicheline,
                    },
                ])}
            />
        </Switch>
        <p className="ml-2 text-md font-medium text-black dark:text-white">Micheline</p>
    </div>
);
interface ContractModalProps {
    gotoDeployment: (compilation: ContractCompilation) => void;
    compilation: ContractCompilation;
    onClose: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ gotoDeployment, compilation, ...props }) => {
    const isOpen = React.useMemo(() => !!compilation, [compilation]);
    const [showMicheline, changeShowMicheline] = React.useState(false);

    const storage = React.useMemo(() => {
        try {
            if (compilation) {
                return {
                    json: JSON.stringify(compilation.result.storage.toJSON(), null, 2),
                    micheline: compilation.result.storage.toMicheline(),
                };
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
                        SmartPy
                    </Tab>
                </Tab.List>
                <Tab.Panels className="flex-1 overflow-hidden">
                    <Tab.Panel className="h-full flex flex-col">
                        <JSONOrMichelineSwitch
                            showMicheline={showMicheline}
                            onSwitch={() => changeShowMicheline((prev) => !prev)}
                        />
                        <CodeBlock
                            withCopy
                            square
                            language={'json'}
                            showLineNumbers
                            text={showMicheline ? storage.micheline : storage.json}
                        />
                    </Tab.Panel>
                    <Tab.Panel className="h-full flex flex-col">
                        <JSONOrMichelineSwitch
                            showMicheline={showMicheline}
                            onSwitch={() => changeShowMicheline((prev) => !prev)}
                        />
                        <CodeBlock
                            withCopy
                            square
                            language={'json'}
                            showLineNumbers
                            text={
                                (showMicheline ? compilation?.result.codeMicheline : compilation?.result.codeJSON) || ''
                            }
                        />
                    </Tab.Panel>
                    <Tab.Panel className="h-full">
                        <CodeBlock
                            withCopy
                            square
                            language={'python'}
                            showLineNumbers
                            text={compilation?.result.smartpy || ''}
                        />
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
                    {compilation.kind === Target.TypeCompilation ? 'Type' : 'Value'}{' '}
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
    const [tab, setTab] = React.useState<Target | null>();
    const [contractCompilation, setContractCompilation] = React.useState<ContractCompilation>();
    const [typeValueCompilation, setTypeValueCompilation] = React.useState<TypeCompilation | ValueCompilation>();
    const [testCompilation, setTestCompilation] = React.useState<TestCompilation>();
    const { state } = useEditor();
    const { dispatch: deploymentDispatch } = useDeployment();

    const contractCompilations = React.useMemo(
        () => (state.compilations || []).filter(filterCompilationKind<ContractCompilation>(Target.ContractCompilation)),
        [state.compilations],
    );

    const testCompilations = React.useMemo(
        () => (state.compilations || []).filter(filterCompilationKind<TestCompilation>(Target.Test)),
        [state.compilations],
    );

    const valueCompilations = React.useMemo(
        () => (state.compilations || []).filter(filterCompilationKind<ValueCompilation>(Target.ValueCompilation)),
        [state.compilations],
    );

    const typeCompilations = React.useMemo(
        () => (state.compilations || []).filter(filterCompilationKind<TypeCompilation>(Target.TypeCompilation)),
        [state.compilations],
    );

    const selectedTab = React.useMemo(() => {
        if (tab) {
            return tab;
        } else if (contractCompilations.length) {
            return Target.ContractCompilation;
        } else if (typeCompilations.length) {
            return Target.TypeCompilation;
        } else if (valueCompilations.length) {
            return Target.ValueCompilation;
        }
        return Target.ContractCompilation;
    }, [contractCompilations.length, tab, typeCompilations.length, valueCompilations.length]);

    function onTabSelection(kind: Target) {
        setTab((t) => (t === kind ? null : kind));
    }

    const gotoDeployment = React.useCallback(
        (compilation: ContractCompilation) => {
            deploymentDispatch({
                type: DeploymentActionKind.UPDATE_STATE,
                payload: {
                    storageXML: compilation.result.storageXML,
                    code: compilation.result.codeJSON,
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
                    selected={selectedTab === Target.ContractCompilation}
                    select={() => onTabSelection(Target.ContractCompilation)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== Target.ContractCompilation,
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
                            onClick={() => setContractCompilation(compilation)}
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
            {isDevelopment() ? (
                <>
                    <div className="flex items-center justify-between p-5 border-b border-t">
                        <TabInfo title="Tests" items={testCompilations.length} />
                        <ExpandButton
                            selected={selectedTab === Target.Test}
                            select={() => onTabSelection(Target.Test)}
                        />
                    </div>
                    <div
                        className={buildClassName([
                            {
                                classes: 'hidden',
                                append: selectedTab !== Target.Test,
                            },
                            {
                                classes:
                                    'grow basis-0 border-t p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400',
                            },
                        ])}
                    >
                        {testCompilations.map((compilation) => (
                            <div
                                key={compilation.result.name}
                                className="mb-3 bg-white shadow-lg rounded-md p-3 dark:bg-black border-2 border-black dark:border-white"
                            >
                                <div className="flex items-center justify-center text-xl text-center align-middle font-mono p-2 border-2 rounded-lg mb-3">
                                    <p className="text-ellipsis overflow-hidden">{compilation.result.name}</p>
                                </div>
                                <Button
                                    fullWidth
                                    onClick={() => setTestCompilation(compilation)}
                                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 mb-2 p-1"
                                >
                                    Run Test
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
            <div className="flex items-center justify-between border-t p-5">
                <TabInfo title="Values" items={valueCompilations.length} />
                <ExpandButton
                    selected={selectedTab === Target.ValueCompilation}
                    select={() => onTabSelection(Target.ValueCompilation)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== Target.ValueCompilation,
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
                            onClick={() => setTypeValueCompilation(compilation)}
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
                    selected={selectedTab === Target.TypeCompilation}
                    select={() => onTabSelection(Target.TypeCompilation)}
                />
            </div>
            <div
                className={buildClassName([
                    {
                        classes: 'hidden',
                        append: selectedTab !== Target.TypeCompilation,
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
                            onClick={() => setTypeValueCompilation(compilation)}
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
                    <ContractModal
                        gotoDeployment={gotoDeployment}
                        onClose={() => setContractCompilation(undefined)}
                        {...props}
                    />
                )}
            </ConditionalRender>
            <ConditionalRender
                props={{
                    compilation: typeValueCompilation,
                }}
            >
                {(props) => <TypeValueModal onClose={() => setTypeValueCompilation(undefined)} {...props} />}
            </ConditionalRender>
            <ConditionalRender
                props={{
                    compilation: testCompilation,
                }}
            >
                {(props) => <TestModal onClose={() => setTestCompilation(undefined)} {...props} />}
            </ConditionalRender>
        </div>
    );
};

export default CompilationDrawer;
