import { TezosToolkit, WalletOriginateParams } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { localForger } from '@taquito/local-forging';
import { NetworkType } from '@airgap/beacon-types';
import TezMonitor from '@tezwell/tezmonitor';

import { NetworkKind } from 'src/context/Tezos';
import * as Beacon from './beacon';

export interface TezosWallet {
    taquito: TezosToolkit;
    beacon: BeaconWallet;
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
        case NetworkKind.Ithacanet:
            return NetworkType.ITHACANET;
        case NetworkKind.Jakartanet:
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
): Promise<TezosWallet> => {
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

    return { taquito: tezos, beacon: wallet };
};

/**
 * @description Deploy smart-contract.
 *
 * @param client Tezos client
 * @param params Origination arguments
 *
 * @returns The originated contract address and a confirmation promise.
 */
export const deployContract = async (client: TezosWallet, params: WalletOriginateParams) => {
    const pkh = await client.taquito.wallet.pkh();
    const counter = Number((await client.taquito.rpc.getContract(pkh)).counter || 0);
    const blockHeader = await client.taquito.rpc.getBlockHeader();
    const operation: any = {
        kind: 'origination',
        counter: String(counter + 1),
        source: pkh,
        fee: String((params.fee || 0) * 1_000_000),
        balance: String(params.balance),
        gas_limit: String(params.gasLimit),
        storage_limit: String(params.storageLimit),
        script: {
            code: params.code,
            storage: params.init,
        },
        delegate: params.delegate || undefined,
    };
    const bytes = await localForger.forge({
        branch: blockHeader.hash,
        contents: [operation],
    });
    const signingResult = await Beacon.sign(client.beacon, bytes);

    const preApplyResults = await client.taquito.rpc.preapplyOperations([
        {
            branch: blockHeader.hash,
            protocol: blockHeader.protocol,
            contents: [operation],
            signature: signingResult.prefixSig,
        },
    ]);
    // Check if the operation can be applied successfully
    if ((preApplyResults?.[0]?.contents?.[0] as any)?.metadata?.operation_result?.status !== 'applied') {
        throw new Error(
            (preApplyResults?.[0]?.contents?.[0] as any)?.metadata.operation_result.errors
                .map(({ id }: any) => id)
                .join(', '),
        );
    }

    const address = (preApplyResults?.[0]?.contents?.[0] as any)?.metadata?.operation_result?.originated_contracts?.[0];
    if (!address) {
        throw new Error('Could not originate contract.');
    }

    const operationHash = await client.taquito.rpc.injectOperation(signingResult.sbytes);

    return {
        operationHash,
        address,
        watcher: TezMonitor.operationConfirmations(client.taquito.rpc.getRpcUrl(), operationHash, 10),
    };
};
