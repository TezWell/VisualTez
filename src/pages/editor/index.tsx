import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import SmartML from '@tezwell/smartts-sdk/smartml';

import EditorView from './view';
import { extractBlocks, compileBlock, Compilation } from 'src/blocks';
import useEditor from 'src/context/hooks/useEditor';
import ErrorModal from 'src/components/common/ErrorModal';
import { notNull } from 'src/utils/guards';

const EditorContainer = () => {
    const workspaceRef = React.useRef<WorkspaceSvg>();
    const { error, updateError, updateCompilations } = useEditor();

    const compile = React.useCallback(() => {
        if (workspaceRef.current) {
            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const compilations: Compilation[] = blocks.map(compileBlock).filter(notNull);
                updateCompilations(compilations);
                console.debug(blocks.map(compileBlock));
                console.debug(SmartML.compileContract((compilations[0].result as any).code));
            } catch (e: any) {
                console.debug(e);
                updateError(e.message);
            }
        }
    }, [updateCompilations, updateError]);

    return (
        <>
            <EditorView workspaceRef={workspaceRef} compile={compile} />
            <ErrorModal title="Editor Error" open={!!error} onClose={() => updateError()}>
                {error}
            </ErrorModal>
        </>
    );
};

export default EditorContainer;
