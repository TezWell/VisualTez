import React, { createContext } from 'react';

import { connect, TezosWallet } from 'src/services/wallet';
import settings from 'src/settings.json';
import Logger from 'src/utils/logger';

export enum NetworkKind {
    Mainnet = 'mainnet',
    Ghostnet = 'ghostnet',
    Kathmandu = 'kathmandu',
}

export const DEFAULT_RPC = {
    [NetworkKind.Mainnet]: 'https://mainnet-tezos.giganode.io',
    [NetworkKind.Ghostnet]: 'https://ghostnet.visualtez.com',
    [NetworkKind.Kathmandu]: 'https://rpc.kathmandunet.teztnets.xyz',
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
    client: React.MutableRefObject<TezosWallet | undefined>;
    walletStatus: ITezosWalletStatus;
    connectWallet: (tryReconnection?: boolean) => void;
    changeNetwork: (network: NetworkKind) => void;
    changeRPC: (rpc: string) => void;
}

const contextStub: ITezosContext = {
    state: {
        network: NetworkKind.Mainnet,
        rpc: DEFAULT_RPC[NetworkKind.Mainnet],
    },
    client: {
        current: undefined,
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

const Provider: React.FC<{ children?: React.ReactNode }> = (props) => {
    const [state, setState] = React.useState<ITezosStorage>(() => fetchState());
    const [walletStatus, setWalletStatus] = React.useState<ITezosWalletStatus>({
        connected: false,
        connecting: false,
    });
    const client = React.useRef<TezosWallet>();

    const connectWallet = React.useCallback(
        async (tryReconnection = false) => {
            setWalletStatus({
                connected: false,
                connecting: true,
            });
            try {
                client.current = await connect(state.rpc, state.network, tryReconnection);
                const address = await client.current.taquito.wallet.pkh();
                setWalletStatus({
                    address,
                    balance: 0,
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
        },
        [state.network, state.rpc],
    );

    const changeNetwork = (network: NetworkKind) => {
        setState((s) => ({
            ...s,
            network,
            rpc: DEFAULT_RPC[network],
        }));
        client.current?.taquito.setRpcProvider(DEFAULT_RPC[network]);
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
        client.current?.taquito.setRpcProvider(rpc);
        setWalletStatus((prev) => ({
            ...prev,
            error: '',
        }));
    };

    const updateBalance = React.useCallback(async () => {
        if (client.current && walletStatus.connected) {
            const balance = (await client.current.taquito.rpc.getBalance(walletStatus.address)).toNumber();
            setWalletStatus((s) => ({
                ...s,
                balance,
            }));
        }
    }, [walletStatus.connected]);

    React.useEffect(() => {
        saveState(state);
    }, [state]);

    React.useEffect(() => {
        updateBalance();
    }, [updateBalance, state.rpc]);

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
