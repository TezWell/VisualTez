import React from 'react';
import SmartML from '@tezwell/smartts-sdk/smartml';

import BlocklySmartML from 'src/generators/SmartML';
import Editor from 'src/context/Editor';
import EditorView from './view';

const EditorContainer = () => {
    const workspaceRef = React.useRef<any>();
    const [code, setCode] = React.useState<string>();

    const compile = React.useCallback(() => {
        if (workspaceRef.current) {
            const code = BlocklySmartML.workspaceToCode(workspaceRef.current);
            const michelson = SmartML.compileContract(code);
            setCode(JSON.stringify(michelson, null, 4));
        }
    }, [workspaceRef]);

    return (
        <Editor.Provider>
            <EditorView workspaceRef={workspaceRef} compilationResults={code} compile={compile} />
        </Editor.Provider>
    );
};

export default EditorContainer;
