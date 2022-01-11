import React from 'react';

import BlocklyEditor from 'src/components/blockly/Editor';
import NetworkSelection from 'src/components/tezos/NetworkSelection';
import DeployParameters from './DeployParameters';
import InitialStorage from './InitialStorage';

const DeployView = () => {
    const workspaceRef = React.useRef<any>();

    return (
        <div className="flex flex-col flex-1 container m-auto p-5">
            <NetworkSelection />
            <div className="relative border-t m-3 border-black dark:border-white" />
            <InitialStorage />
            <div className="relative border-t m-3 border-black dark:border-white" />
            <DeployParameters />

            <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Deploy Contract
            </button>
        </div>
    );
};
export default DeployView;
