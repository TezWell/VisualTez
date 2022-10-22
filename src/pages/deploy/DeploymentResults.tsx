import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import CircularLoading from 'src/components/common/Spinner';
import useDeployment from 'src/context/hooks/useDeployment';
import Avatar from 'src/components/common/Avatar';
import Button from 'src/components/common/Button';

const DeploymentResults = () => {
    const { state } = useDeployment();

    if (state.deploying) {
        return (
            <div className="flex flex-col md:flex-row justify-center items-center p-5 rounded shadow-xl border-2 border-black dark:border-amber-400">
                <CircularLoading className="h-56 w-56" message="Deploying..." />
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="flex flex-col justify-center items-center p-5 rounded shadow-xl border-2 border-red-400">
                <div className="flex items-center justify-center p-2 rounded-full bg-red-100">
                    <ExclamationCircleIcon className="block h-8 w-8 text-red-600" aria-hidden="true" />
                </div>
                <div className="text-center mt-5">
                    <p className="text-sm text-red-600 dark:text-red-300">{state.error}</p>
                </div>
            </div>
        );
    }

    if (state.result.address) {
        return (
            <div className="flex flex-col justify-center items-center p-5 shadow-xl border-2 border-black rounded dark:border-amber-400">
                <div className="text-center mb-5">
                    <p className="text-sm font-bold text-amber-600 dark:text-amber-300">
                        The contract was successfully deployed!
                    </p>
                </div>

                <div className="flex items-center justify-center w-full mt-2">
                    <div className="flex items-center justify-center p-2 rounded-full border-2 border-amber-500 dark:border-amber-400">
                        <Avatar value={state.result.address} size={64} />
                    </div>
                    <div className="ml-4">
                        <span className="h-10 px-3 inline-flex items-center rounded-l-md border-2 border-black dark:border-amber-400 text-sm font-bold">
                            Confirmations
                        </span>
                        <span className="h-10 px-3 inline-flex items-center rounded-r-md border-2 border-l-0 border-black dark:border-amber-400 text-sm font-bold">
                            {state.result.confirmations}
                        </span>
                    </div>
                </div>
                <div className="mt-4 flex flex-col w-full">
                    <div className="flex shadow-sm w-full">
                        <span className="w-24 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Address
                        </span>
                        <span className="flex-1 px-3 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-lg p-2 truncate">
                            {state.result.address}
                        </span>
                    </div>
                    <div className="mt-2 flex shadow-sm w-full">
                        <span className="w-24 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Operation
                        </span>
                        <span className="flex-1 px-3 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-lg p-2 truncate">
                            {state.result.operationHash}
                        </span>
                    </div>
                    <div className="flex shadow-sm mt-4 w-full">
                        <a
                            className="w-full"
                            href={`https://better-call.dev/search?text=${state.result.address}`}
                            target="_blank"
                        >
                            <Button
                                fullWidth
                                className="bg-amber-500 hover:bg-amber-400 border-amber-700 hover:border-amber-600 mb-2 p-2"
                            >
                                Open in Better Call Dev
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default DeploymentResults;
