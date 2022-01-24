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
            changeNetwork(e.target.value);
        },
        [changeNetwork],
    );

    return (
        <div className="relative shadow-lg rounded-md p-2 border-2 border-black dark:border-white">
            <div className="relative border-b border-black dark:border-white mb-2">
                <label className="block text-sm font-medium">Parameters</label>
            </div>
            <div className="mt-1 flex"></div>
        </div>
    );
};

export default DeployParameters;
