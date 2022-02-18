import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
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
    const { error, updateError, updateCompilations } = useEditor();
    const [sharedWorkspace, setSharedWorkspace] = React.useState<string>();
    const [searchParams] = useSearchParams();

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
            } catch (e: any) {
                Logger.debug(e);
                updateError(e.message);
            }
        }
    }, [updateCompilations, updateError]);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            getPermalink();
        }
    }, [getPermalink]);

    return (
        <>
            <EditorView workspaceRef={workspaceRef} compile={compile} onError={updateError} />
            <ErrorModal title="Editor Error" open={!!error} onClose={() => updateError()}>
                {error}
            </ErrorModal>
            {sharedWorkspace ? (
                <SharedWorkspace
                    mainWorkspaceRef={workspaceRef}
                    xml={sharedWorkspace}
                    onClose={() => setSharedWorkspace(undefined)}
                />
            ) : null}
        </>
    );
};

export default EditorContainer;
