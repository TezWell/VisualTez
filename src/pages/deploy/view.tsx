import React from 'react';
import type { WorkspaceSvg } from 'blockly';

import BlocklyEditor from 'src/components/blockly/Editor';
import Button from 'src/components/common/Button';
import NetworkSelection from 'src/components/tezos/NetworkSelection';
import DeployParameters from './DeployParameters';
import InitialStorage from './InitialStorage';

const DeployView = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();

    return (
        <div className="flex flex-col flex-1 container m-auto p-5">
            <NetworkSelection />
            <div className="relative border-t m-3 border-black dark:border-white" />
            <InitialStorage workspaceRef={workspaceRef} />
            <div className="relative border-t m-3 border-black dark:border-white" />
            <DeployParameters />
            <div className="relative border-t m-3 border-black dark:border-white" />
            <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 mb-2 p-1"
            >
                Deploy Contract
            </Button>
        </div>
    );
};
export default DeployView;
