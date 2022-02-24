import { Workspace, WorkspaceSvg } from 'blockly';
import React from 'react';
import { extractBlocks } from 'src/blocks';
import Michelson from 'src/blocks/generators/Michelson';

import Editor from 'src/context/Editor';
import useDeployment from 'src/context/hooks/useDeployment';
import Logger from 'src/utils/logger';
import EditorView from './view';

const DeployContainer = () => {
    const { state: deploymentState } = useDeployment();
    const workspaceRef = React.useRef<WorkspaceSvg>();

    const deploy = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const code = JSON.parse(deploymentState.code || '{}');
                if (!code) {
                    throw new Error('Could not prepare contract code.');
                }
                const storage = blocks.map((block) => Michelson.translateValue(block).toJSON())?.[0];
                if (!storage) {
                    throw new Error('Could not generate initial storage.');
                }
            } catch (e: any) {
                Logger.debug(e);
            }
        }
    }, [deploymentState.code]);

    return (
        <Editor.Provider>
            <EditorView deploy={deploy} workspaceRef={workspaceRef} />
        </Editor.Provider>
    );
};

export default DeployContainer;
