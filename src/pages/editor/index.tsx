import React from 'react';
import Blockly, { Workspace, WorkspaceSvg } from 'blockly';

import { extractBlocks, compileBlock, Compilation } from 'src/blocks';
import useEditor from 'src/context/hooks/useEditor';
import ErrorModal from 'src/components/common/ErrorModal';
import { notNull } from 'src/utils/guards';
import Logger from 'src/utils/logger';
import { updateErrorInfo } from 'src/blocks/utils/errorHandling';
import { EditorActionKind } from 'src/context/Editor';

import EditorView from './view';
import SharedWorkspace from './SharedWorkspace';

const EditorContainer = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const { state, workspace, dispatch } = useEditor();
    const workspaceID = React.useRef(workspace.id);

    const updateError = React.useCallback(
        (msg?: string) => {
            dispatch({
                type: EditorActionKind.UPDATE_ERROR,
                payload: {
                    msg,
                },
            });
        },
        [dispatch],
    );

    const compile = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const compilations: Compilation[] = blocks.map(compileBlock).filter(notNull);
                dispatch({
                    type: EditorActionKind.UPDATE_COMPILATIONS,
                    payload: compilations,
                });
            } catch (e: any) {
                const errorMessage: string = e?.message || e.toString();
                Logger.debug(errorMessage);
                if (updateErrorInfo(workspaceRef.current, errorMessage)) {
                    updateError(errorMessage);
                }
            }
        }
    }, [dispatch, updateError]);

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
    }, [dispatch, updateError, workspace.id, workspace.xml]);

    return (
        <>
            <EditorView workspaceRef={workspaceRef} compile={compile} onError={updateError} />
            <ErrorModal title="Editor Error" open={!!state.error} onClose={() => updateError(undefined)}>
                {state.error}
            </ErrorModal>
            <SharedWorkspace mainWorkspaceRef={workspaceRef} />
        </>
    );
};

export default EditorContainer;
