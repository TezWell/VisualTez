import React from 'react';
import type { WorkspaceSvg } from 'blockly';

import BlocklyEditor from 'src/components/blockly/Editor';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import useEditor from 'src/context/hooks/useEditor';
import { generateRandomString } from 'src/utils/rand';
import { EditorActionKind } from 'src/context/Editor';

interface SharedWorkspaceProps {
    mainWorkspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
}

const SharedWorkspace: React.FC<SharedWorkspaceProps> = ({ mainWorkspaceRef }) => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const [name, setName] = React.useState(`Workspace_${generateRandomString()}`);
    const { state, dispatch } = useEditor();

    const updateName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const updateVolatileWorkspace = React.useCallback(
        (xml?: string) => {
            dispatch({
                type: EditorActionKind.UPDATE_VOLATILE_WORKSPACE,
                payload: xml,
            });
        },
        [dispatch],
    );

    const importWorkspace = React.useCallback(() => {
        if (mainWorkspaceRef.current) {
            dispatch({
                type: EditorActionKind.CREATE_WORKSPACE,
                payload: {
                    name,
                    xml: state.volatileWorkspace,
                },
            });
            updateVolatileWorkspace();
        }
    }, [dispatch, mainWorkspaceRef, name, state.volatileWorkspace, updateVolatileWorkspace]);

    return (
        <Modal
            open={!!state.volatileWorkspace}
            onClose={() => updateVolatileWorkspace()}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Import Workspace
                </div>
            }
            actions={[
                <Button
                    key="import"
                    onClick={importWorkspace}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Import
                </Button>,
                <Button
                    key="close"
                    onClick={() => updateVolatileWorkspace()}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="flex flex-col h-96">
                <div className="p-2">
                    <input
                        type="text"
                        name="workspace-name"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300  dark:text-black"
                        placeholder="Workspace Name"
                        value={name}
                        onChange={updateName}
                    />
                </div>
                <div className="relative grow">
                    <BlocklyEditor
                        currentXML={state.volatileWorkspace}
                        workspaceRef={workspaceRef}
                        noToolbox
                        trashcan={false}
                        readOnly
                        zoom={{
                            controls: true,
                            wheel: true,
                            startScale: 0.1,
                            maxScale: 2,
                            minScale: 0.01,
                            scaleSpeed: 1.1,
                        }}
                        move={{
                            drag: true,
                            scrollbars: true,
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default SharedWorkspace;
