import React, { createContext } from 'react';

import settings from 'src/settings.json';

export enum NetworkKind {
    Mainnet = 'Mainnet',
    Hangzhounet = 'Hangzhounet',
}

export const DEFAULT_RPC = {
    [NetworkKind.Mainnet]: 'https://mainnet.api.tez.ie',
    [NetworkKind.Hangzhounet]: 'https://hangzhounet.api.tez.ie',
};

interface ITezosStorage {
    network: NetworkKind;
    rpc: string;
}

export interface ITezosContext {
    state: ITezosStorage;
    changeNetwork: (network: NetworkKind) => void;
    changeRPC: (rpc: string) => void;
}

const contextStub: ITezosContext = {
    state: {
        network: NetworkKind.Mainnet,
        rpc: DEFAULT_RPC[NetworkKind.Mainnet],
    },
    changeNetwork: () => {
        // stub
    },
    changeRPC: () => {
        // stub
    },
};
const Context = createContext<ITezosContext>(contextStub);

const STORAGE_KEY = `${settings.storage_prefix}/tezos`;

/**
 * @description Fetch state from local storage.
 * @returns {ITezosStorage} state
 */
const fetchState = (): ITezosStorage => {
    const state: ITezosStorage = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');

    // Enforce defaults
    state.network ||= NetworkKind.Mainnet;
    state.rpc ||= DEFAULT_RPC[NetworkKind.Mainnet];

    return state;
};

/**
 * @description Save state in the local storage.
 * @param {ITezosStorage} state state
 * @returns {void}
 */
const saveState = (state: ITezosStorage): void => {
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const Provider: React.FC = (props) => {
    const [state, setState] = React.useState<ITezosStorage>(fetchState());

    const changeNetwork = (network: NetworkKind) => {
        setState((s) => ({
            ...s,
            network,
            rpc: DEFAULT_RPC[network],
        }));
    };

    const changeRPC = (rpc: string) => {
        setState((s) => ({
            ...s,
            rpc,
        }));
    };

    React.useEffect(() => {
        saveState(state);
    }, [state]);

    return (
        <Context.Provider
            value={{
                state,
                changeNetwork,
                changeRPC,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

const Tezos = {
    Context,
    Provider,
};

export default Tezos;
