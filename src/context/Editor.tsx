import React, { createContext } from 'react';

import type { Compilation } from 'src/blocks';
import settings from 'src/settings.json';

export enum DrawerKind {
    Compilation = 'compilation',
    Settings = 'settings',
    Share = 'share',
    Storage = 'storage',
}

interface IEditorStorage {
    currentXML: string;
    divider?: {
        left: string;
        right: string;
    };
}

export interface IEditorContext {
    state: IEditorStorage;
    updateXML: (xml: string) => void;
    updateDivider: (left: string, right: string) => void;
    drawer: DrawerKind | null;
    updateDrawer: (drawer?: DrawerKind) => void;
    error?: string;
    updateError: (msg?: string) => void;

    compilations: Compilation[];
    updateCompilations: (compilations: Compilation[]) => void;
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
    updateError: () => {
        // stub
    },
    compilations: [],
    updateCompilations: () => {
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
    const [drawer, setDrawer] = React.useState<DrawerKind | null>(null);
    const [error, setError] = React.useState<string>();
    const [compilations, setCompilations] = React.useState<Compilation[]>([]);

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

    const updateDrawer = React.useCallback((newDrawer?: DrawerKind) => setDrawer(!newDrawer ? null : newDrawer), []);

    const updateError = React.useCallback((msg?: string) => setError(msg), []);

    const updateCompilations = React.useCallback((compilations: Compilation[]) => setCompilations(compilations), []);

    return (
        <Context.Provider
            value={{
                state,
                updateXML,
                updateDivider,
                drawer,
                updateDrawer,
                error,
                updateError,
                compilations,
                updateCompilations,
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
