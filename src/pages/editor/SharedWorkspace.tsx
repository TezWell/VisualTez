import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';

import BlocklyEditor from 'src/components/blockly/Editor';
import Button from 'src/components/common/Button';
import Modal from 'src/components/common/Modal';
import useEditor from 'src/context/hooks/useEditor';

interface SharedWorkspaceProps {
    mainWorkspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    xml: string;
    onClose: () => void;
}

const SharedWorkspace: React.FC<SharedWorkspaceProps> = ({ mainWorkspaceRef, xml, onClose }) => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const { updateXML } = useEditor();

    const importWorkspace = React.useCallback(() => {
        if (mainWorkspaceRef.current) {
            updateXML(xml);
            Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), mainWorkspaceRef.current as Workspace);
            Blockly.svgResize(mainWorkspaceRef.current);
            mainWorkspaceRef.current.scrollCenter();
            onClose();
        }
    }, [mainWorkspaceRef, onClose, updateXML, xml]);

    return (
        <Modal
            open={true}
            onClose={onClose}
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
                    onClick={onClose}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="relative h-96">
                <BlocklyEditor
                    currentXML={xml}
                    noToolbox
                    workspaceRef={workspaceRef}
                    trashcan={false}
                    readOnly
                    zoom={{
                        controls: true,
                        wheel: true,
                        startScale: 0.4,
                        maxScale: 1,
                        minScale: 0.1,
                        scaleSpeed: 1.1,
                    }}
                    renderer="zelos"
                />
            </div>
        </Modal>
    );
};

export default SharedWorkspace;
