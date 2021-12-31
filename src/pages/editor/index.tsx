import React from 'react';

import Editor from 'src/context/Editor';
import EditorView from './view';
const EditorContainer = () => {
    const workspaceRef = React.useRef<any>();

    return (
        <Editor.Provider>
            <EditorView workspaceRef={workspaceRef} />
        </Editor.Provider>
    );
};

export default EditorContainer;
