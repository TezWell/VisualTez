import React from 'react';
import Blockly, { Workspace, WorkspaceSvg } from 'blockly';
import { useSearchParams } from 'react-router-dom';

import { extractBlocks, compileBlock, Compilation } from 'src/blocks';
import useEditor from 'src/context/hooks/useEditor';
import ErrorModal from 'src/components/common/ErrorModal';
import { notNull } from 'src/utils/guards';
import Logger from 'src/utils/logger';
import Http from 'src/utils/http';
import { AES } from 'src/utils/crypto';
import settings from 'src/settings.json';

import EditorView from './view';
import SharedWorkspace from './SharedWorkspace';
import { updateErrorInfo } from 'src/blocks/utils/errorHandling';
import { DrawerKind } from 'src/context/Editor';
import ConditionalRender from 'src/components/common/ConditionalRender';

export const extractWorkspaceFromPermalink = async (hash: string, passPhrase: string) => {
    try {
        const { data } = await Http.get<{ content: string }>(`${settings.storage_api}/sharings/${hash}`, {
            timeout: 5000,
        });

        return AES.decrypt(data.content, passPhrase);
    } catch (e) {
        Logger.debug(e);
    }
};

const EditorContainer = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const mounted = React.useRef(false);
    const { error, workspace, updateDrawer, updateError, updateCompilations } = useEditor();
    const [sharedWorkspace, setSharedWorkspace] = React.useState<string>();
    const [searchParams] = useSearchParams();
    const workspaceID = React.useRef(workspace.id);

    const getPermalink = React.useCallback(() => {
        const hash = searchParams.get('h');
        const passPhrase = searchParams.get('k');
        if (hash && passPhrase) {
            extractWorkspaceFromPermalink(hash, passPhrase).then(setSharedWorkspace);
        }
    }, [searchParams]);

    const compile = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const compilations: Compilation[] = blocks.map(compileBlock).filter(notNull);
                updateCompilations(compilations);
                updateDrawer(DrawerKind.Compilation);
            } catch (e: any) {
                const errorMessage: string = e?.message || e.toString();
                Logger.debug(errorMessage);
                if (updateErrorInfo(workspaceRef.current, errorMessage)) {
                    updateError(errorMessage);
                }
            }
        }
    }, [updateCompilations, updateDrawer, updateError]);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            getPermalink();
        }
    }, [getPermalink]);

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
            <ConditionalRender
                props={{
                    xml: sharedWorkspace,
                }}
            >
                {(props) => (
                    <SharedWorkspace
                        mainWorkspaceRef={workspaceRef}
                        onClose={() => setSharedWorkspace(undefined)}
                        {...props}
                    />
                )}
            </ConditionalRender>
        </>
    );
};

export default EditorContainer;
