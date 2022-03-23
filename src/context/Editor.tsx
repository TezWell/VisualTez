import React, { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Compilation } from 'src/blocks';
import settings from 'src/settings.json';
import { SelectivePartial } from 'src/typings/utils';
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

interface IEditorState extends IEditorStorage {
    error?: string;
    volatileWorkspace?: string;
    drawer?: DrawerKind;
    compilations?: Compilation[];
}

export interface IEditorContext {
    state: IEditorState;
    dispatch: React.Dispatch<EditorReducerAction>;
    workspace: IEditorWorkspace;
}

type EditorReducerAction =
    | {
          type: EditorActionKind.DELETE_WORKSPACE;
          payload: { workspaceID: string };
      }
    | {
          type: EditorActionKind.CREATE_WORKSPACE;
          payload: { name: string; xml?: string };
      }
    | {
          type: EditorActionKind.UPDATE_WORKSPACE;
          payload: SelectivePartial<IEditorWorkspace, 'name' | 'xml'>;
      }
    | {
          type: EditorActionKind.UPDATE_RENDERER;
          payload: EditorRenderer;
      }
    | {
          type: EditorActionKind.CHANGE_SELECTED_WORKSPACE;
          payload?: string;
      }
    | {
          type: EditorActionKind.UPDATE_ERROR;
          payload: { msg?: string };
      }
    | {
          type: EditorActionKind.UPDATE_DRAWER;
          payload?: DrawerKind;
      }
    | {
          type: EditorActionKind.UPDATE_COMPILATIONS;
          payload: Compilation[];
      }
    | {
          type: EditorActionKind.UPDATE_VOLATILE_WORKSPACE;
          payload?: string;
      };

export enum EditorActionKind {
    DELETE_WORKSPACE = 'EDITOR__DELETE_WORKSPACE__ACTION',
    CREATE_WORKSPACE = 'EDITOR__CREATE_WORKSPACE__ACTION',
    UPDATE_WORKSPACE = 'EDITOR__UPDATE_WORKSPACE__ACTION',
    UPDATE_RENDERER = 'EDITOR__UPDATE_RENDERER__ACTION',
    CHANGE_SELECTED_WORKSPACE = 'EDITOR__CHANGE_SELECTED_WORKSPACE__ACTION',
    UPDATE_ERROR = 'EDITOR__UPDATE_ERROR__ACTION',
    UPDATE_DRAWER = 'EDITOR__UPDATE_DRAWER__ACTION',
    UPDATE_COMPILATIONS = 'EDITOR__UPDATE_COMPILATIONS__ACTION',
    UPDATE_VOLATILE_WORKSPACE = 'EDITOR__UPDATE_VOLATILE_WORKSPACE__ACTION',
}

const contextStub: IEditorContext = {
    state: {
        workspaces: {},
        renderer: EditorRenderer.Zelos,
    },
    dispatch: () => {
        // stub
    },
    workspace: {
        id: '',
        name: '',
        xml: '',
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
 * Save editor state in the local storage.
 *
 * @param {IEditorState} state Editor state
 *
 * @returns {void}
 */
const saveEditorState = (state: IEditorState): void => {
    const storage: IEditorStorage = {
        currentWorkspace: state.currentWorkspace,
        renderer: state.renderer,
        workspaces: state.workspaces,
    };

    globalThis.localStorage.setItem(EDITOR_STORAGE_KEY, JSON.stringify(storage));
};

/**
 * State reducer
 *
 * @param state Previous state
 * @param action An action to be performed
 *
 * @returns New state
 */
const reducer = (state: IEditorState, action: EditorReducerAction): IEditorState => {
    switch (action.type) {
        case EditorActionKind.DELETE_WORKSPACE:
            const { workspaceID } = action.payload;
            return {
                ...state,
                currentWorkspace: state.currentWorkspace === workspaceID ? undefined : state.currentWorkspace,
                workspaces: Object.keys(state.workspaces).reduce((p, c) => {
                    if (workspaceID !== c) {
                        p[c] = state.workspaces[c];
                    }
                    return p;
                }, {} as Record<string, IEditorWorkspace>),
            };
        case EditorActionKind.CREATE_WORKSPACE: {
            const { name, xml } = action.payload;
            const workspace = newWorkspace(name, xml);
            return {
                ...state,
                workspaces: {
                    ...state.workspaces,
                    [workspace.id]: workspace,
                },
                currentWorkspace: workspace.id,
            };
        }
        case EditorActionKind.UPDATE_WORKSPACE: {
            const { id } = action.payload;
            return {
                ...state,
                workspaces: {
                    ...state.workspaces,
                    [id]: {
                        ...(state.workspaces[id] || {}),
                        ...action.payload,
                    },
                },
            };
        }
        case EditorActionKind.UPDATE_RENDERER:
            return {
                ...state,
                renderer: action.payload,
            };
        case EditorActionKind.CHANGE_SELECTED_WORKSPACE:
            return {
                ...state,
                currentWorkspace: action.payload,
            };
        case EditorActionKind.UPDATE_ERROR:
            return {
                ...state,
                error: action.payload.msg,
            };
        case EditorActionKind.UPDATE_DRAWER:
            return {
                ...state,
                drawer: !action.payload || state.drawer === action.payload ? undefined : action.payload,
            };
        case EditorActionKind.UPDATE_COMPILATIONS:
            return {
                ...state,
                compilations: action.payload,
            };
        case EditorActionKind.UPDATE_VOLATILE_WORKSPACE:
            return {
                ...state,
                volatileWorkspace: action.payload,
            };
        default:
            return state;
    }
};

const Provider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(reducer, {
        ...contextStub.state,
        ...fetchEditorState(),
    });
    const [searchParams] = useSearchParams();

    const workspace = React.useMemo(() => {
        if (state.currentWorkspace && state.currentWorkspace in state.workspaces) {
            return state.workspaces[state.currentWorkspace];
        }

        if (Object.keys(state?.workspaces || {}).length) {
            return Object.values(state.workspaces)[0];
        }

        const workspace = newWorkspace('Default Workspace');
        dispatch({ type: EditorActionKind.UPDATE_WORKSPACE, payload: workspace });
        return workspace;
    }, [state.currentWorkspace, state.workspaces]);

    React.useEffect(() => {
        saveEditorState(state);
    }, [state]);

    React.useEffect(
        () => {
            const hash = searchParams.get('h');
            const passPhrase = searchParams.get('k');
            if (hash && passPhrase) {
                extractWorkspaceFromPermalink(hash, passPhrase).then((xml) =>
                    dispatch({ type: EditorActionKind.UPDATE_VOLATILE_WORKSPACE, payload: xml }),
                );
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
                dispatch,
                workspace,
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
