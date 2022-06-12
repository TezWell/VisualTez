import { WorkspaceSvg } from 'core/workspace_svg';
import React from 'react';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import { DeploymentActionKind } from 'src/context/Deployment';
import BlocklyEditor from 'src/components/blockly/Editor';
import useDeployment from 'src/context/hooks/useDeployment';

const StorageTypeModal = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const { state, dispatch } = useDeployment();

    const hideModal = React.useCallback(() => {
        dispatch({
            type: DeploymentActionKind.HIDE_STORAGE_TYPE,
        });
    }, [dispatch]);

    return (
        <Modal
            open={state.showStorageType}
            onClose={hideModal}
            height={96}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Storage Type
                </div>
            }
            actions={[
                <Button
                    key="close"
                    onClick={hideModal}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="flex flex-col h-full relative grow">
                <BlocklyEditor
                    currentXML={state.storageTypeXML}
                    workspaceRef={workspaceRef}
                    noToolbox
                    trashcan={false}
                    readOnly
                    zoom={{
                        controls: true,
                        wheel: true,
                        startScale: 1,
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
        </Modal>
    );
};

export default StorageTypeModal;
