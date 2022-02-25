import React from 'react';
import useTezos from 'src/context/hooks/useTezos';
import { DEFAULT_RPC, NetworkKind } from 'src/context/Tezos';

const NetworkSelection = () => {
    const { state, changeNetwork, changeRPC } = useTezos();

    const onRpcChange = React.useCallback(
        (e) => {
            changeRPC(e.target.value);
        },
        [changeRPC],
    );

    const onNetworkChange = React.useCallback(
        (e) => {
            changeNetwork(e.target.value);
        },
        [changeNetwork],
    );

    return (
        <div className="relative shadow-lg rounded-md p-2 shadow-xl border-2 border-black dark:border-amber-400">
            <div className="relative border-b border-black dark:border-white mb-2">
                <label className="block text-sm font-medium">Network Selection</label>
            </div>
            <div className="mt-1 flex flex-col md:flex-row">
                <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Network
                    </span>
                    <select
                        name="tezos-network"
                        value={state.network}
                        onChange={onNetworkChange}
                        className="block w-full rounded-none rounded-r-md text-sm border-gray-300 text-black"
                    >
                        {Object.entries(NetworkKind).map(([text, value]) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                        <option disabled value="CUSTOM">
                            Custom
                        </option>
                    </select>
                </div>
                <div className="border-t border-r m-1 border-black dark:border-white" />
                <div className="flex flex-1 rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        RPC
                    </span>
                    <input
                        type="text"
                        name="tezos-rpc"
                        className="block w-full rounded-none rounded-r-md text-sm border-gray-300 dark:text-black"
                        placeholder={DEFAULT_RPC[NetworkKind.Mainnet]}
                        value={state.rpc}
                        onChange={onRpcChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NetworkSelection;
