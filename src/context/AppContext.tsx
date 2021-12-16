import { createContext } from 'react';

export interface IAppContext {
    editorXml: string;
    setEditorXml: (xml: string) => void;
}

const contextStub: IAppContext = {
    editorXml: '',
    setEditorXml: () => {
        // stub
    },
};

const AppContext = createContext<IAppContext>(contextStub);

export default AppContext;
