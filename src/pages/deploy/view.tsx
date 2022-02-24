import React from 'react';
import type { WorkspaceSvg } from 'blockly';

import Button from 'src/components/common/Button';
import NetworkSelection from 'src/components/tezos/NetworkSelection';
import DeployParameters from './DeployParameters';
import InitialStorage from './InitialStorage';
import ConnectWallet from 'src/components/wallet/ConnectWallet';

interface DeployViewProps {
    deploy: () => void;
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
}

const DeployView: React.FC<DeployViewProps> = ({ deploy, workspaceRef }) => {
    return (
        <div className="flex flex-col flex-1 container m-auto p-5">
            <NetworkSelection />
            <div className="border-t m-3 border-black dark:border-white" />
            <ConnectWallet />
            <div className="border-t m-3 border-black dark:border-white" />
            <InitialStorage workspaceRef={workspaceRef} />
            <div className="border-t m-3 border-black dark:border-white" />
            <DeployParameters workspaceRef={workspaceRef} />
            <div className="border-t m-3 border-black dark:border-white" />
            <Button
                type="button"
                onClick={deploy}
                className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-2"
            >
                Deploy Contract
            </Button>
        </div>
    );
};
export default DeployView;
