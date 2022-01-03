import React, { createContext } from 'react';

import settings from 'src/settings.json';

interface IEditorStorage {
    currentXML: string;
    divider?: {
        left: string;
        right: string;
    };
}

export type DrawerOptions = 'compilation' | 'settings';
export interface IEditorContext {
    state: IEditorStorage;
    updateXML: (xml: string) => void;
    updateDivider: (left: string, right: string) => void;
    drawer: DrawerOptions | null;
    updateDrawer: (drawer?: DrawerOptions) => void;
}

const contextStub: IEditorContext = {
    state: {
        currentXML: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
    },
    updateXML: () => {
        // stub
    },
    updateDivider: () => {
        // stub
    },
    drawer: null,
    updateDrawer: () => {
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
    const [drawer, setDrawer] = React.useState<DrawerOptions | null>(null);

    React.useEffect(() => {
        saveEditorState(state);
    }, [state]);

    const updateXML = React.useCallback((xml: string) => {
        updateState((state) => ({
            ...state,
            currentXML: xml,
        }));
    }, []);

    const updateDivider = React.useCallback((left: string, right: string) => {
        updateState((state) => ({
            ...state,
            divider: {
                left,
                right,
            },
        }));
    }, []);

    const updateDrawer = React.useCallback(
        (newDrawer?: DrawerOptions) => setDrawer((old) => (!newDrawer || old === newDrawer ? null : newDrawer)),
        [],
    );

    return (
        <Context.Provider
            value={{
                state,
                updateXML,
                updateDivider,
                drawer,
                updateDrawer,
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
