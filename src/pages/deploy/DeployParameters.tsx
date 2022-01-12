import React from 'react';
import useTezos from 'src/context/hooks/useTezos';
import { NetworkKind } from 'src/context/Tezos';

const DeployParameters = () => {
    const { state, changeNetwork, changeRPC } = useTezos();

    const onRpcChange = React.useCallback(
        (e) => {
            changeRPC(e.target.value);
        },
        [changeRPC],
    );

    const onNetworkChange = React.useCallback(
        (e) => {
            console.error(e.target.name, e.target.value);
            changeNetwork(e.target.value);
        },
        [changeNetwork],
    );

    return (
        <div className="relative shadow-lg rounded-md p-2 border-2 border-black dark:border-white">
            <div className="relative border-b border-black dark:border-white mb-2">
                <label className="block text-sm font-medium">Parameters</label>
            </div>
            <div className="mt-1 flex">
                <select
                    name="tezos-network"
                    onChange={onNetworkChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 dark:text-black"
                >
                    {Object.keys(NetworkKind).map((network) => (
                        <option>{network}</option>
                    ))}
                </select>
                <div className="relative h-10 border ml-3 mr-3 border-black dark:border-white" />
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        RPC
                    </span>
                    <input
                        type="text"
                        name="tezos-rpc"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300  dark:text-black"
                        placeholder="https://mainnet.api.tez.ie"
                        value={state.rpc}
                        onChange={onRpcChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeployParameters;