import React from 'react';
import { Disclosure } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import { ActionKind, IActionResult, IActionResultStatus } from '@tezwell/tezos-testing-sdk/action';

import settings from 'src/settings.json';
import { TestCompilation } from 'src/blocks';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import { buildClassName } from 'src/utils/className';
import Http from 'src/utils/http';
import Logger from 'src/utils/logger';
import CircularLoading from 'src/components/common/Spinner';
import useEditor from 'src/context/hooks/useEditor';
import { EditorActionKind } from 'src/context/Editor';

const getActionLabel = (action: ActionKind): string => {
    switch (action) {
        case ActionKind.CallContract:
            return 'Contract Call';
        case ActionKind.CreateImplicitAccount:
            return 'Create Implicit Account';
        case ActionKind.OriginateContract:
            return 'Originate Contract';
    }
};

const ActionStatus = ({ status }: { status: IActionResultStatus }) =>
    status === IActionResultStatus.Failure ? (
        <div className="flex items-center justify-center h-10 w-10 p-1 rounded-full bg-red-200">
            <XIcon className="block h-full text-red-600" aria-hidden="true" />
        </div>
    ) : (
        <div className="flex items-center justify-center h-10 w-10 p-1 rounded-full bg-green-200">
            <CheckIcon className="block h-full text-green-600" aria-hidden="true" />
        </div>
    );

interface ActionResultProps {
    action: IActionResult;
    connect: boolean;
}
const ActionResult: React.FC<ActionResultProps> = ({ action, connect }) => {
    switch (action.kind) {
        case ActionKind.CreateImplicitAccount:
        case ActionKind.OriginateContract:
            return (
                <div className="flex justify-start mt-1">
                    <div className="flex flex-col">
                        <ActionStatus status={action.status} />
                        {/* Connector */}
                        <div
                            className={buildClassName([
                                {
                                    append: connect,
                                    classes: 'grow mt-1 h-full ml-[18px] border-l-2 border-black dark:border-white',
                                },
                            ])}
                        />
                    </div>
                    <div className="m-1" />
                    <Disclosure>
                        {({ open }) => (
                            <div
                                className={buildClassName([
                                    {
                                        classes: 'flex justify-center items-center flex-col w-full rounded-lg',
                                    },
                                    {
                                        classes: 'bg-green-200',
                                        append: action.status === IActionResultStatus.Success,
                                    },
                                    {
                                        classes: 'bg-red-200',
                                        append: action.status === IActionResultStatus.Failure,
                                    },
                                ])}
                            >
                                <Disclosure.Button className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>{getActionLabel(action.kind)}</span>
                                    <ChevronUpIcon
                                        className={buildClassName([
                                            {
                                                classes: 'transform rotate-180',
                                                append: open,
                                            },
                                            {
                                                classes: 'block w-5 h-5',
                                            },
                                        ])}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className=" w-full p-2 text-sm border-t">
                                    {JSON.stringify(action.result)}
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                </div>
            );
    }
    return null;
};

interface TestModalProps {
    compilation: TestCompilation;
    onClose: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ compilation, ...props }) => {
    const { dispatch } = useEditor();
    const isOpen = React.useMemo(() => !!compilation, [compilation]);
    const [running, setRunning] = React.useState(false);
    const [results, setResults] = React.useState<IActionResult[]>();

    const runTests = async () => {
        setRunning(true);
        try {
            const results = await Http.post(settings.testing_api, compilation.result.actions).then(({ data }) => data);
            console.error(results);
            setResults(results);
        } catch (e: any) {
            dispatch({
                type: EditorActionKind.UPDATE_ERROR,
                payload: {
                    msg: e.message || e.toString() || e,
                },
            });
            Logger.debug(e.message || e.toString() || e);
        } finally {
            setRunning(false);
        }
    };

    React.useEffect(() => {
        runTests();
    }, []);

    return (
        <Modal
            {...props}
            open={isOpen}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Test
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
            <div className="flex flex-col justify-center items-center h-full">
                {running ? (
                    <CircularLoading className="h-56 w-56" message="Executing ..." />
                ) : (
                    <div className="h-full w-full p-5">
                        {(results || []).map((action, index) => (
                            <div>
                                {/* Connector */}
                                <div
                                    className={buildClassName([
                                        {
                                            append: index !== 0,
                                            classes:
                                                'grow h-[14px] ml-[18px] border-l-2 border-black dark:border-white',
                                        },
                                    ])}
                                />
                                <ActionResult
                                    key={index}
                                    action={action}
                                    connect={index !== (results?.length || 0) - 1}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TestModal;
