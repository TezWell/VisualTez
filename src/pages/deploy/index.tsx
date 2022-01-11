import React from 'react';

import Editor from 'src/context/Editor';
import EditorView from './view';

const DeployContainer = () => {
    return (
        <Editor.Provider>
            <EditorView />
        </Editor.Provider>
    );
};

export default DeployContainer;
