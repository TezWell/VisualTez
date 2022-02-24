import type { Workspace, WorkspaceSvg } from 'blockly';
import React from 'react';

import { extractBlocks } from 'src/blocks';
import Michelson from 'src/blocks/generators/Michelson';
import Button from 'src/components/common/Button';
import { Field } from 'src/context/Deployment';
import useDeployment from 'src/context/hooks/useDeployment';
import useTezos from 'src/context/hooks/useTezos';
import { estimateOrigination } from 'src/services/wallet/estimator';
import Logger from 'src/utils/logger';

interface DeployParametersProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
}

const DeployParameters: React.FC<DeployParametersProps> = ({ workspaceRef }) => {
    const { client } = useTezos();
    const { state, parameters, changeParameters } = useDeployment();

    const onFieldChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            switch (e.target.name) {
                case Field.Delegate:
                    return changeParameters({
                        ...parameters,
                        [e.target.name]: e.target.value,
                    });
                case Field.Amount:
                case Field.Fee:
                case Field.Gas_limit:
                case Field.Storage_limit:
                    return changeParameters({
                        ...parameters,
                        [e.target.name]: Number(e.target.value),
                    });
            }
        },
        [changeParameters, parameters],
    );

    const estimate = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const code = JSON.parse(state.code || '{}');
                if (!code) {
                    throw new Error('Could not prepare contract code.');
                }
                const storage = blocks.map((block) => Michelson.translateValue(block).toJSON())?.[0];
                if (!storage) {
                    throw new Error('Could not generate initial storage.');
                }
                if (client.current) {
                    estimateOrigination(client.current, {
                        code,
                        storage,
                    }).then(({ fee, gasLimit: gas_limit, storageLimit: storage_limit }) => {
                        changeParameters({
                            fee,
                            gas_limit,
                            storage_limit,
                        });
                    });
                }
            } catch (e: any) {
                Logger.debug(e);
            }
        }
    }, [changeParameters, client, state.code, workspaceRef]);

    return (
        <div className="rounded-md p-2 border-2 shadow-xl border-2 border-amber-500 dark:border-amber-400">
            <div className="flex justify-between items-center border-b border-black dark:border-white mb-2 pb-2">
                <label className="font-mono text-xl font-bold">Parameters</label>
                <Button
                    onClick={estimate}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-1 px-2"
                >
                    Estimate Costs
                </Button>
            </div>
            <div className="flex flex-col space-y-1">
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Delegate
                    </span>
                    <input
                        type="text"
                        placeholder="Delegation Address (Optional)"
                        name={Field.Delegate}
                        onChange={onFieldChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:text-black"
                    />
                </div>
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Amount* (ꜩ)
                    </span>
                    <input
                        type="number"
                        value={parameters[Field.Amount]}
                        min={0}
                        step={1}
                        name={Field.Amount}
                        onChange={onFieldChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:text-black"
                    />
                </div>
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Fee* (ꜩ)
                    </span>
                    <input
                        type="number"
                        value={parameters[Field.Fee]}
                        min={0}
                        step={0.001}
                        name={Field.Fee}
                        onChange={onFieldChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:text-black"
                    />
                </div>
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Gas Limit*
                    </span>
                    <input
                        type="number"
                        value={parameters[Field.Gas_limit]}
                        min={0}
                        step={100}
                        name={Field.Gas_limit}
                        onChange={onFieldChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:text-black"
                    />
                </div>
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Storage Limit*
                    </span>
                    <input
                        type="number"
                        value={parameters[Field.Storage_limit]}
                        min={0}
                        step={100}
                        name={Field.Storage_limit}
                        onChange={onFieldChange}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 dark:text-black"
                    />
                </div>
            </div>
        </div>
    );
};

export default DeployParameters;
