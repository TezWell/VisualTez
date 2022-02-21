import React, { createContext } from 'react';

import type { Compilation } from 'src/blocks';
import settings from 'src/settings.json';
import { generateRandomString } from 'src/utils/rand';

export enum DrawerKind {
    Compilation = 'compilation',
    Settings = 'settings',
    Share = 'share',
    Storage = 'storage',
}

export enum EditorRenderer {
    Zelos = 'zelos',
    Thrasos = 'thrasos',
    Geras = 'geras',
}

interface IEditorWorkspace {
    id: string;
    name: string;
    xml: string;
}

interface IEditorStorage {
    currentWorkspace?: string;
    workspaces: Record<string, IEditorWorkspace>;
    renderer: EditorRenderer;
    divider?: {
        left: string;
        right: string;
    };
}

export interface IEditorContext {
    state: IEditorStorage;
    workspace: IEditorWorkspace;
    createWorkspace: (name: string, xml: string) => void;
    updateWorkspace: (workspace: IEditorWorkspace) => void;
    updateRenderer: (renderer: EditorRenderer) => void;
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
        workspaces: {},
        renderer: EditorRenderer.Zelos,
    },
    workspace: {
        id: '',
        name: '',
        xml: '',
    },
    createWorkspace: () => {
        // stub
    },
    updateWorkspace: () => {
        // stub
    },
    updateRenderer: () => {
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

const newWorkspace = (name: string, xml?: string): IEditorWorkspace => ({
    id: generateRandomString(),
    name,
    xml: xml || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
});

/**
 * @description Fetch editor state from local storage.
 * @returns {IEditorStorage} Editor state
 */
const fetchEditorState = (): IEditorStorage => {
    const storage: IEditorStorage = JSON.parse(window.localStorage.getItem(EDITOR_STORAGE_KEY) || '{}');

    // Set default renderer
    storage.renderer ||= EditorRenderer.Zelos;

    if (!Object.keys(storage.workspaces)?.length) {
        const defaultWorkspace = newWorkspace('Default Workspace');
        storage.workspaces = {
            [defaultWorkspace.id]: defaultWorkspace,
        };
    }

    return storage;
};

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

    const workspace = React.useMemo(() => {
        return state.currentWorkspace ? state.workspaces[state.currentWorkspace] : Object.values(state.workspaces)[0];
    }, [state.currentWorkspace, state.workspaces]);

    React.useEffect(() => {
        saveEditorState(state);
    }, [state]);

    const updateWorkspace = React.useCallback((workspace: IEditorWorkspace) => {
        updateState((state) => ({
            ...state,
            workspaces: {
                ...state.workspaces,
                [workspace.id]: workspace,
            },
        }));
    }, []);

    const createWorkspace = React.useCallback((name: string, xml: string) => {
        const workspace = newWorkspace(name, xml);

        updateState((state) => ({
            ...state,
            workspaces: {
                ...state.workspaces,
                [workspace.id]: workspace,
            },
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

    const updateRenderer = React.useCallback((renderer: EditorRenderer) => {
        updateState((state) => ({
            ...state,
            renderer,
        }));
    }, []);

    return (
        <Context.Provider
            value={{
                state,
                workspace,
                updateWorkspace,
                createWorkspace,
                updateRenderer,
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
