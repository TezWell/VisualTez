import React, { createContext, Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Compilation } from 'src/blocks';
import settings from 'src/settings.json';
import { AES } from 'src/utils/crypto';
import Http from 'src/utils/http';
import Logger from 'src/utils/logger';
import { generateRandomString } from 'src/utils/rand';

export enum DrawerKind {
    Compilation = 'compilation',
    Settings = 'settings',
    Share = 'share',
    Storage = 'storage',
    Templates = 'templates',
}

export enum EditorRenderer {
    Zelos = 'zelos',
    Thrasos = 'thrasos',
    Geras = 'geras',
}

export interface IEditorWorkspace {
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
    createWorkspace: (name: string, xml?: string) => void;
    updateWorkspace: (workspace: IEditorWorkspace) => void;
    deleteWorkspace: (workspaceId: string) => void;
    updateRenderer: (renderer: EditorRenderer) => void;
    updateEditorState: (args: {
        currentWorkspace?: string;
        divider?: {
            left: string;
            right: string;
        };
    }) => void;
    drawer: DrawerKind | null;
    updateDrawer: (drawer?: DrawerKind) => DrawerKind | null;
    error?: string;
    updateError: (msg?: string) => void;

    compilations: Compilation[];
    updateCompilations: (compilations: Compilation[]) => void;

    volatileWorkspace?: string;
    updateVolatileWorkspace: Dispatch<SetStateAction<string | undefined>>;
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
    deleteWorkspace: () => {
        // stub
    },
    updateRenderer: () => {
        // stub
    },
    updateEditorState: () => {
        // stub
    },
    drawer: null,
    updateDrawer: () => {
        return null;
    },
    updateError: () => {
        // stub
    },
    compilations: [],
    updateCompilations: () => {
        // stub
    },
    updateVolatileWorkspace: () => {
        // stub
    },
};

const extractWorkspaceFromPermalink = async (hash: string, passPhrase: string) => {
    try {
        const { data } = await Http.get<{ content: string }>(`${settings.storage_api}/sharings/${hash}`, {
            timeout: 5000,
        });

        return AES.decrypt(data.content, passPhrase);
    } catch (e) {
        Logger.debug(e);
    }
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
    const [volatileWorkspace, updateVolatileWorkspace] = React.useState<string>();
    const [searchParams] = useSearchParams();

    const updateEditorState = React.useCallback(
        (args: {
            currentWorkspace?: string;
            divider?: {
                left: string;
                right: string;
            };
        }) => {
            updateState((state) => ({
                ...state,
                ...args,
            }));
        },
        [],
    );

    const updateWorkspace = React.useCallback((workspace: IEditorWorkspace) => {
        updateState((state) => ({
            ...state,
            workspaces: {
                ...state.workspaces,
                [workspace.id]: workspace,
            },
        }));
    }, []);

    const deleteWorkspace = React.useCallback((workspaceId: string) => {
        updateState((state) => ({
            ...state,
            currentWorkspace: state.currentWorkspace === workspaceId ? undefined : state.currentWorkspace,
            workspaces: Object.keys(state.workspaces).reduce((p, c) => {
                if (workspaceId !== c) {
                    p[c] = state.workspaces[c];
                }
                return p;
            }, {} as Record<string, IEditorWorkspace>),
        }));
    }, []);

    const createWorkspace = React.useCallback((name: string, xml?: string) => {
        const workspace = newWorkspace(name, xml);

        updateState((state) => ({
            ...state,
            workspaces: {
                ...state.workspaces,
                [workspace.id]: workspace,
            },
            currentWorkspace: workspace.id,
        }));

        return workspace;
    }, []);

    const updateDrawer = React.useCallback(
        (newDrawer?: DrawerKind) => {
            const new_drawer = !newDrawer || drawer === newDrawer ? null : newDrawer;
            setDrawer(new_drawer);
            return new_drawer;
        },
        [drawer],
    );

    const updateError = React.useCallback((msg?: string) => setError(msg), []);

    const updateCompilations = React.useCallback((compilations: Compilation[]) => setCompilations(compilations), []);

    const updateRenderer = React.useCallback((renderer: EditorRenderer) => {
        updateState((state) => ({
            ...state,
            renderer,
        }));
    }, []);

    const workspace = React.useMemo(() => {
        if (state.currentWorkspace && state.currentWorkspace in state.workspaces) {
            return state.workspaces[state.currentWorkspace];
        }

        if (Object.keys(state?.workspaces || {}).length) {
            return Object.values(state.workspaces)[0];
        }

        return createWorkspace('Default Workspace');
    }, [createWorkspace, state.currentWorkspace, state.workspaces]);

    React.useEffect(() => {
        saveEditorState(state);
    }, [state]);

    React.useEffect(
        () => {
            const hash = searchParams.get('h');
            const passPhrase = searchParams.get('k');
            if (hash && passPhrase) {
                extractWorkspaceFromPermalink(hash, passPhrase).then(updateVolatileWorkspace);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            /* ONLY ON MOUNT */
        ],
    );

    return (
        <Context.Provider
            value={{
                state,
                workspace,
                updateWorkspace,
                createWorkspace,
                deleteWorkspace,
                updateRenderer,
                updateEditorState,
                drawer,
                updateDrawer,
                error,
                updateError,
                compilations,
                updateCompilations,
                volatileWorkspace,
                updateVolatileWorkspace,
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
