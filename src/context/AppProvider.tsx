import React from 'react';
import AppContext from './AppContext';

const EDITOR_XML_STORAGE_KEY = 'EDITOR_XML2';

const getXMLFromStorage = (): string => {
    const xml = window.localStorage.getItem(EDITOR_XML_STORAGE_KEY) || '';
    return xml;
};

const AppProvider: React.FC = (props) => {
    const [editorXml, setEditorXml] = React.useState<string>(getXMLFromStorage());

    const onEditorXMLChange = (xml: string) => {
        setEditorXml(xml);
        window.localStorage.setItem(EDITOR_XML_STORAGE_KEY, xml);
    };

    return (
        <AppContext.Provider
            value={{
                editorXml,
                setEditorXml: onEditorXMLChange,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;
