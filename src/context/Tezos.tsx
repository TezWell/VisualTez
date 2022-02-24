import React, { createContext } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { connect } from 'src/services/wallet';

import settings from 'src/settings.json';
import Logger from 'src/utils/logger';

export enum NetworkKind {
    Mainnet = 'mainnet',
    Hangzhounet = 'hangzhounet',
    Ithacanet = 'ithacanet',
}

export const DEFAULT_RPC = {
    [NetworkKind.Mainnet]: 'https://mainnet.visualtez.com',
    [NetworkKind.Hangzhounet]: 'https://hangzhounet.visualtez.com',
    [NetworkKind.Ithacanet]: 'https://ithacanet.visualtez.com',
};

export const NETWORK_OF_RPC: Record<string, NetworkKind> = Object.values(NetworkKind).reduce(
    (p, network: NetworkKind) => ({
        ...p,
        [DEFAULT_RPC[network]]: network,
    }),
    {},
);

interface ITezosStorage {
    network: NetworkKind;
    rpc: string;
}

type ITezosWalletStatus = {
    connecting: boolean;
    error?: string;
} & (
    | {
          address: string;
          balance: number;
          connected: true;
      }
    | {
          connected: false;
      }
);

export interface ITezosContext {
    state: ITezosStorage;
    client: React.MutableRefObject<TezosToolkit | undefined>;
    walletStatus: ITezosWalletStatus;
    connectWallet: () => void;
    changeNetwork: (network: NetworkKind) => void;
    changeRPC: (rpc: string) => void;
}

const contextStub: ITezosContext = {
    state: {
        network: NetworkKind.Mainnet,
        rpc: DEFAULT_RPC[NetworkKind.Mainnet],
    },
    client: {
        current: {} as any,
    },
    walletStatus: {
        connected: false,
        connecting: false,
    },
    connectWallet: () => {
        // stub
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
    const [walletStatus, setWalletStatus] = React.useState<ITezosWalletStatus>({
        connected: false,
        connecting: false,
    });
    const client = React.useRef<TezosToolkit>();

    const connectWallet = async () => {
        setWalletStatus({
            connected: false,
            connecting: true,
        });
        try {
            client.current = await connect(state.rpc, state.network);
            const address = await client.current.wallet.pkh();
            const balance = (await client.current.rpc.getBalance(address)).toNumber();
            setWalletStatus({
                address,
                balance,
                connected: true,
                connecting: false,
                error: '',
            });
        } catch (e: any) {
            Logger.debug(e);
            setWalletStatus({
                connected: false,
                connecting: false,
                error: e?.message || `${e}`,
            });
        }
    };

    const changeNetwork = (network: NetworkKind) => {
        setState((s) => ({
            ...s,
            network,
            rpc: DEFAULT_RPC[network],
        }));
        client.current?.setRpcProvider(DEFAULT_RPC[network]);
        setWalletStatus((prev) => ({
            ...prev,
            error: '',
        }));
    };

    const changeRPC = (rpc: string) => {
        setState((s) => ({
            ...s,
            network: NETWORK_OF_RPC[rpc] || 'CUSTOM',
            rpc,
        }));
        client.current?.setRpcProvider(rpc);
        setWalletStatus((prev) => ({
            ...prev,
            error: '',
        }));
    };

    React.useEffect(() => {
        saveState(state);
    }, [state]);

    return (
        <Context.Provider
            value={{
                state,
                client,
                walletStatus,
                connectWallet,
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
