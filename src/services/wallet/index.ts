import { TezosToolkit, WalletOriginateParams } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

import { NetworkKind } from 'src/context/Tezos';

enum NetworkType {
    MAINNET = 'mainnet',
    HANGZHOUNET = 'hangzhounet',
    IDIAZABALNET = 'idiazabalnet',
    CUSTOM = 'custom',
}

enum PermissionScope {
    SIGN = 'sign',
    OPERATION_REQUEST = 'operation_request',
    ENCRYPT = 'encrypt',
    THRESHOLD = 'threshold',
}

const getNetwork = (network: NetworkKind): NetworkType => {
    switch (network) {
        case NetworkKind.Mainnet:
            return NetworkType.MAINNET;
        case NetworkKind.Hangzhounet:
            return NetworkType.HANGZHOUNET;
        default:
            return NetworkType.CUSTOM;
    }
};

/**
 * @description Connect to the wallet.
 *
 * @param rpc
 * @param network
 *
 * @returns A promise that resolves to void;
 */
export const connect = async (
    rpc: string,
    network: NetworkKind,
    tryRecover = false,
    networkType = getNetwork(network),
) => {
    const tezos = new TezosToolkit(rpc);

    const options = {
        name: 'VisualTez',
        iconUrl: 'https://visualtez.com/assets/logo.svg',
        preferredNetwork: networkType,
        appUrl: 'https://visualtez.com',
    };
    const wallet = new BeaconWallet(options);
    // Set beacon as wallet provider
    tezos.setWalletProvider(wallet);

    const activeAccount = await wallet.client.getActiveAccount();

    if (!tryRecover || !activeAccount) {
        // Reset config, we want users to always be able to select a wallet provider.
        await wallet.disconnect();
        // Request permissions
        await wallet.requestPermissions({
            scopes: [PermissionScope.OPERATION_REQUEST],
            network: {
                type: networkType,
                rpcUrl: rpc,
            },
        });
    }

    return tezos;
};

/**
 * @description Deploy smart-contract.
 *
 * @param client Tezos client
 * @param params Origination arguments
 * @returns The originated contract address and a confirmation promise.
 */
export const deployContract = async (client: TezosToolkit, params: WalletOriginateParams<unknown>) => {
    const result = await client.wallet.originate(params).send();
    return {
        address: (await result.contract()).address,
        operationHash: result.opHash,
    };
};
