import { useContext } from 'react';

import Editor from '../Editor';

const useEditor = () => {
    const context = useContext(Editor.Context);
    if (context == null) {
        throw new Error('`editor context` is not available.');
    }
    return context;
};

export default useEditor;
