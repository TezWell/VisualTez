import React from 'react';
import Blockly, { Workspace, WorkspaceSvg } from 'blockly';

import { extractBlocks, compileBlock, Compilation } from 'src/blocks';
import useEditor from 'src/context/hooks/useEditor';
import ErrorModal from 'src/components/common/ErrorModal';
import { notNull } from 'src/utils/guards';
import Logger from 'src/utils/logger';

import EditorView from './view';
import SharedWorkspace from './SharedWorkspace';
import { updateErrorInfo } from 'src/blocks/utils/errorHandling';

const EditorContainer = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const { workspace, error, updateError, updateCompilations } = useEditor();
    const workspaceID = React.useRef(workspace.id);

    const compile = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const compilations: Compilation[] = blocks.map(compileBlock).filter(notNull);
                updateCompilations(compilations);
            } catch (e: any) {
                const errorMessage: string = e?.message || e.toString();
                Logger.debug(errorMessage);
                if (updateErrorInfo(workspaceRef.current, errorMessage)) {
                    updateError(errorMessage);
                }
            }
        }
    }, [updateCompilations, updateError]);

    React.useEffect(() => {
        try {
            if (workspaceID.current !== workspace.id) {
                const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
                Blockly.Xml.clearWorkspaceAndLoadFromXml(
                    Blockly.Xml.textToDom(workspace.xml || baseXML),
                    workspaceRef.current as Workspace,
                );
                workspaceID.current = workspace.id;
            }
        } catch (e: any) {
            Logger.debug(e);
            updateError(e.message || e.toString?.());
        }
    }, [workspace.id]);

    return (
        <>
            <EditorView workspaceRef={workspaceRef} compile={compile} onError={updateError} />
            <ErrorModal title="Editor Error" open={!!error} onClose={() => updateError(undefined)}>
                {error}
            </ErrorModal>
            <SharedWorkspace mainWorkspaceRef={workspaceRef} />
        </>
    );
};

export default EditorContainer;
