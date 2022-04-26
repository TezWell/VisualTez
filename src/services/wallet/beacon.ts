import { BeaconWallet } from '@taquito/beacon-wallet';
import { SigningType } from '@airgap/beacon-dapp';
import bs58check from 'bs58check';

/**
 * Uses the Beacon SDK to sign operations.
 *
 * @param wallet Beacon wallet
 * @param bytes Operation bytes to sign
 *
 * @returns Signature result
 */
export const sign = async (wallet: BeaconWallet, bytes: string) => {
    const result = await wallet.client.requestSignPayload({
        signingType: SigningType.OPERATION,
        payload: '03' + bytes,
    });

    let sbytes = bs58check.decode(result.signature);
    if (result.signature.startsWith('edsig') || result.signature.startsWith('spsig1')) {
        sbytes = sbytes.slice(5).toString('hex');
    } else if (result.signature.startsWith('p2sig')) {
        sbytes = sbytes.slice(4).toString('hex');
    } else {
        sbytes = sbytes.slice(3).toString('hex');
    }

    return {
        bytes,
        sig: sbytes,
        prefixSig: result.signature,
        sbytes: `${bytes}${sbytes}`,
    };
};
