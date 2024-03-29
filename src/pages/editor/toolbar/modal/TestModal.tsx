import React from 'react';
import { Disclosure } from '@headlessui/react';
import { CheckIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { ActionKind, ActionResultStatus, IAction, IActionResult } from '@tezwell/tezos-testing-sdk/action';

import settings from 'src/settings.json';
import { TestCompilation } from 'src/blocks';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import { buildClassName } from 'src/utils/className';
import Http from 'src/utils/http';
import CircularLoading from 'src/components/common/Spinner';
import CodeBlock from 'src/components/CodeBlock';
import { isDevelopment } from 'src/utils';

const getActionLabel = (action: IAction): string | React.ReactElement => {
    switch (action.kind) {
        case ActionKind.CallContract:
            return (
                <span>
                    Call entrypoint{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.entrypoint}
                    </span>{' '}
                    of contract{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.recipient}
                    </span>
                </span>
            );
        case ActionKind.CreateImplicitAccount:
            return (
                <span>
                    Create an implicit account{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">{action.payload.name}</span>{' '}
                    with balance{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.balance} μꜩ
                    </span>
                </span>
            );
        case ActionKind.OriginateContract:
            return (
                <span>
                    Originate contract{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">{action.payload.name}</span>
                </span>
            );
        case ActionKind.AssertAccountBalance:
            return 'Assert Account Balance';
        case ActionKind.AssertContractStorage:
            return 'Assert Contract Storage';
        case ActionKind.ModifyBlockLevel:
            return (
                <span>
                    Modify next block level to{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.level}
                    </span>
                </span>
            );
        case ActionKind.ModifyBlockTimestamp:
            return (
                <span>
                    Modify next block timestamp to{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.timestamp}
                    </span>
                </span>
            );
        case ActionKind.ModifyChainID:
            return (
                <span>
                    Modify chain identifier to{' '}
                    <span className="text-amber-800 font-bold border border-amber-800 px-1">
                        {action.payload.chain_id}
                    </span>
                </span>
            );
        case ActionKind.PackData:
            return 'Pack Data';
    }
};

const ActionStatus = ({ status }: { status: ActionResultStatus }) =>
    status === ActionResultStatus.Failure ? (
        <div className="flex items-center justify-center h-10 w-10 p-1 rounded-full bg-red-200">
            <XCircleIcon className="block h-full text-red-600" aria-hidden="true" />
        </div>
    ) : (
        <div className="flex items-center justify-center h-10 w-10 p-1 rounded-full bg-green-200">
            <CheckIcon className="block h-full text-green-600" aria-hidden="true" />
        </div>
    );

const ResultDetails = ({ result }: { result: IActionResult }) => {
    // The "details" field will only be present in case of failure
    switch (result.status) {
        case ActionResultStatus.Failure:
            switch (result.action.kind) {
                case ActionKind.CallContract:
                    if (result.action.payload.expect_failwith) {
                        if ('actual' in result.result && 'expected' in result.result) {
                            return (
                                <div>
                                    <p className="my-2 font-bold">Expected</p>
                                    <CodeBlock
                                        language="json"
                                        text={JSON.stringify(result.result['expected'], null, 4)}
                                        showLineNumbers
                                    />
                                    <p className="my-2 font-bold">Received</p>
                                    <CodeBlock
                                        language="json"
                                        text={JSON.stringify(result.result['actual'], null, 4)}
                                        showLineNumbers
                                    />
                                </div>
                            );
                        }
                    }

                    break;
                case ActionKind.AssertContractStorage:
                case ActionKind.AssertAccountBalance:
                    if ('actual' in result.result && 'expected' in result.result) {
                        return (
                            <div>
                                <p className="my-2 font-bold">Expected</p>
                                <CodeBlock
                                    language="json"
                                    text={JSON.stringify(result.result['expected'], null, 4)}
                                    showLineNumbers
                                />
                                <p className="my-2 font-bold">Received</p>
                                <CodeBlock
                                    language="json"
                                    text={JSON.stringify(result.result['actual'], null, 4)}
                                    showLineNumbers
                                />
                            </div>
                        );
                    }
            }
            return (
                <div>
                    <p className="my-2 font-bold">Error Details</p>
                    <CodeBlock
                        language="json"
                        text={String(result.result['details'] || 'Something went wrong :(')}
                        showLineNumbers={false}
                    />
                </div>
            );
        case ActionResultStatus.Success:
            switch (result.action.kind) {
                case ActionKind.CreateImplicitAccount:
                    return (
                        <div>
                            <p className="my-2 font-bold">Wallet Address</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['address'], null, 4)}
                                showLineNumbers={false}
                            />
                        </div>
                    );
                case ActionKind.OriginateContract:
                    return (
                        <div>
                            <p className="my-2 font-bold">Contract Address</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['address'], null, 4)}
                                showLineNumbers={false}
                            />
                        </div>
                    );
                case ActionKind.CallContract:
                    if (result.action.payload.expect_failwith) {
                        return <p className="my-2 font-bold">The contract call failed as expected.</p>;
                    }
                    return (
                        <div>
                            <p className="my-2 font-bold">New Contract Storage</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['storage'], null, 4)}
                                showLineNumbers
                            />
                        </div>
                    );
                case ActionKind.ModifyBlockLevel:
                    return (
                        <div>
                            <p className="my-2 font-bold">Next block level</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['level'], null, 4)}
                                showLineNumbers={false}
                            />
                        </div>
                    );
                case ActionKind.ModifyBlockTimestamp:
                    return (
                        <div>
                            <p className="my-2 font-bold">Next block timestamp</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['timestamp'], null, 4)}
                                showLineNumbers={false}
                            />
                        </div>
                    );
                case ActionKind.ModifyChainID:
                    return (
                        <div>
                            <p className="my-2 font-bold">Chain Identifier</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['chain_id'], null, 4)}
                                showLineNumbers={false}
                            />
                        </div>
                    );
                case ActionKind.AssertContractStorage:
                    return (
                        <div>
                            <p className="my-2 font-bold">Contract Storage</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['storage'], null, 4)}
                                showLineNumbers
                            />
                        </div>
                    );
                case ActionKind.AssertAccountBalance:
                    return (
                        <div>
                            <p className="my-2 font-bold">Contract Storage</p>
                            <CodeBlock
                                language="json"
                                text={JSON.stringify(result.result['balance'], null, 4)}
                                showLineNumbers
                            />
                        </div>
                    );
                case ActionKind.PackData:
                    return (
                        <div>
                            <p className="my-2 font-bold">Packed Bytes</p>
                            <CodeBlock language="json" text={result.result['bytes'] as string} showLineNumbers />
                        </div>
                    );
            }
    }
};

interface ActionResultProps {
    result: IActionResult;
    connect: boolean;
}
const ActionResult: React.FC<ActionResultProps> = ({ result, connect }) => {
    return (
        <div className="inline-flex justify-start w-full mt-1">
            <div className="flex flex-col">
                <ActionStatus status={result.status} />
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
            <Disclosure defaultOpen={result.status === ActionResultStatus.Failure}>
                {({ open }) => (
                    <div
                        className={buildClassName([
                            {
                                classes: 'flex justify-center items-center flex-col w-full rounded-lg',
                            },
                            {
                                classes: 'bg-green-200',
                                append: result.status === ActionResultStatus.Success,
                            },
                            {
                                classes: 'bg-red-200',
                                append: result.status === ActionResultStatus.Failure,
                            },
                        ])}
                    >
                        <Disclosure.Button className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left focus:outline-none bg-black/[.1]">
                            <span>{getActionLabel(result.action)}</span>
                            <ChevronUpIcon
                                className={buildClassName([
                                    {
                                        classes: 'transform rotate-180',
                                        append: !open,
                                    },
                                    {
                                        classes: 'block w-5 h-5',
                                    },
                                ])}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-sm w-full max-w-[600px]">
                            <div className="m-2 p-2 border border-black w-full">
                                <Disclosure defaultOpen={result.status === ActionResultStatus.Failure}>
                                    {({ open }) => (
                                        <div>
                                            <Disclosure.Button className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left focus:outline-none bg-black/[.1]">
                                                <span>Show result</span>
                                                <ChevronUpIcon
                                                    className={buildClassName([
                                                        {
                                                            classes: 'transform rotate-180',
                                                            append: !open,
                                                        },
                                                        {
                                                            classes: 'block w-5 h-5',
                                                        },
                                                    ])}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="relative">
                                                <ResultDetails result={result} />
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            </div>
                            <div className="m-2 p-2 border border-black w-full">
                                <Disclosure>
                                    {({ open }) => (
                                        <div>
                                            <Disclosure.Button className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left focus:outline-none bg-black/[.1]">
                                                <span>Show action</span>
                                                <ChevronUpIcon
                                                    className={buildClassName([
                                                        {
                                                            classes: 'transform rotate-180',
                                                            append: !open,
                                                        },
                                                        {
                                                            classes: 'block w-5 h-5',
                                                        },
                                                    ])}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                <div className="relative flex flex-col flex-shrink-0 max-h-[300px] p-2">
                                                    <CodeBlock
                                                        language="json"
                                                        text={JSON.stringify(result.action, null, 4)}
                                                        showLineNumbers={false}
                                                    />
                                                </div>
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            </div>
                        </Disclosure.Panel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};

interface TestModalProps {
    compilation: TestCompilation;
    onClose: () => void;
}
const TestModal: React.FC<TestModalProps> = ({ compilation, ...props }) => {
    const isOpen = React.useMemo(() => !!compilation, [compilation]);
    const [running, setRunning] = React.useState(false);
    const [error, setError] = React.useState<string>();
    const [results, setResults] = React.useState<IActionResult[]>();

    const runTests = React.useCallback(async () => {
        setRunning(true);
        setError(undefined);
        const api = isDevelopment() ? settings.testing_api_dev : settings.testing_api;
        await Http.post(api, compilation.result.suite, { timeout: 60000 })
            .then(({ data }) => setResults(data))
            .catch((e: any) => {
                return setError(e.response?.data?.message || e.message);
            })
            .finally(() => setRunning(false));
    }, [compilation.result.suite]);

    React.useEffect(() => {
        runTests();
    }, [runTests]);

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
            <div className="flex justify-center items-center h-full">
                {running ? (
                    <CircularLoading className="h-56 w-56" message="Executing ..." />
                ) : error ? (
                    <div className="w-full h-full p-5">
                        <h2 className="text-xl font-bold text-black dark:text-white mb-5">Something went wrong :(</h2>
                        <div className="w-full rounded-lg bg-red-400 p-5">
                            <p className="text-black dark:text-white">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full w-full p-5 overflow-y-auto">
                        {(results || []).map((result, index) => (
                            <div key={index}>
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
                                <ActionResult result={result} connect={index !== (results?.length || 0) - 1} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TestModal;
