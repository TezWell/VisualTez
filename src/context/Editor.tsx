import React, { createContext } from 'react';

import settings from 'src/settings.json';

interface IEditorStorage {
    currentXML: string;
}

export interface IEditorContext {
    state: IEditorStorage;
    changeXML: (xml: string) => void;
}

const contextStub: IEditorContext = {
    state: {
        currentXML: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
    },
    changeXML: () => {
        // stub
    },
};

const Context = createContext<IEditorContext>(contextStub);

const EDITOR_STORAGE_KEY = `${settings.storage_prefix}/editor`;

/**
 * @description Fetch editor state from local storage.
 * @returns {IEditorStorage} Editor state
 */
const fetchEditorState = (): IEditorStorage => JSON.parse(window.localStorage.getItem(EDITOR_STORAGE_KEY) || '{}');

/**
 * @description Save editor state in the local storage.
 * @param {IEditorStorage} state Editor state
 * @returns {void}
 */
const saveEditorState = (state: IEditorStorage): void => {
    globalThis.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(state));
};

const Provider: React.FC = (props) => {
    const [state, updateState] = React.useState<IEditorStorage>(fetchEditorState());

    React.useEffect(() => {
        saveEditorState(state);
    }, [state]);

    const changeXML = React.useCallback(
        (xml: string) => {
            updateState({
                ...state,
                currentXML: xml,
            });
        },
        [state],
    );

    return (
        <Context.Provider
            value={{
                state,
                changeXML,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

const Editor = {
    Context,
    Provider,
};

export default Editor;
