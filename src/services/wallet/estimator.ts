import { TezosToolkit } from '@taquito/taquito';

export const DEFAULT_ORIGINATION_COSTS = {
    Fee: 1_266,
    Gas_limit: 1_040_000,
    Storage_limit: 496,
};

/**
 * @description Estimate origination costs
 *
 * @param {TezosToolkit} client Taquito client
 * @param parameters Script parameters
 *
 * @returns {Promise}
 */
export const estimateOrigination = async (
    client: TezosToolkit,
    parameters: { code: object[]; storage: object },
): Promise<{
    fee: number;
    gasLimit: number;
    storageLimit: number;
}> => {
    const pkh = await client.wallet.pkh();
    const counter = Number((await client.rpc.getContract(pkh)).counter || 0);
    const estimate = await estimateOperation(client, {
        kind: 'origination',
        script: {
            code: parameters.code,
            storage: parameters.storage,
        },
        balance: '0',
        fee: String(DEFAULT_ORIGINATION_COSTS.Fee),
        counter: String(counter + 1),
        source: pkh,
    });
    return {
        fee: estimate.estimatedFee / 1_000_000,
        gasLimit: estimate.gas,
        storageLimit: estimate?.storageCost,
    };
};

/**
 * @description Estimate operation costs
 *
 * @param {TezosToolkit} client Taquito client
 * @param operations
 *
 * @returns {Promise}
 */
const estimateOperation = async (
    client: TezosToolkit,
    ...operations: any[]
): Promise<{ gas: number; storageCost: number; estimatedFee: number }> => {
    const DUMMY_BLOCK_HASH = 'BLockGenesisGenesisGenesisGenesisGenesis1db77eJNeJ9';
    const DUMMY_SIGNATURE =
        'edsigu6xFLH2NpJ1VcYshpjW99Yc1TAL1m2XBqJyXrxcZQgBMo8sszw2zm626yjpA3pWMhjpsahLrWdmvX9cqhd4ZEUchuBuFYy';
    const DUMMY_CHAIN_ID = 'NetXZSsxBpMQeAT';

    const constants = await client.rpc.getConstants();
    const gas_limit = constants.hard_gas_limit_per_operation.toFixed();
    const storage_limit = constants.hard_storage_limit_per_operation.toFixed();

    // Update limits to the maximum
    operations = operations.map((op) => ({ ...op, gas_limit, storage_limit }));

    const response = await client.rpc.runOperation({
        chain_id: DUMMY_CHAIN_ID,
        operation: {
            branch: DUMMY_BLOCK_HASH,
            signature: DUMMY_SIGNATURE,
            contents: operations.map((op) => ({ ...op, gas_limit, storage_limit })),
        },
    });

    let gas = 0;
    let storageCost = 0;
    for (const c of response.contents) {
        switch (c.kind) {
            case 'origination':
                gas += parseInt(c['metadata']['operation_result']['consumed_gas'] || '0');
                storageCost += parseInt(c['metadata']['operation_result']['paid_storage_size_diff'] || '0');

                const internalOperations = c['metadata']['internal_operation_results'];
                if (internalOperations === undefined) {
                    continue;
                }

                for (const internalOperation of internalOperations) {
                    const result = internalOperation['result'];
                    gas += parseInt(result['consumed_gas'] || '0');
                    if (internalOperation.kind === 'origination') {
                        storageCost += 257;
                    }
                }
        }
    }

    const forgedOperationGroup = await client.rpc.forgeOperations({
        branch: DUMMY_BLOCK_HASH,
        contents: operations,
    });
    const operationSize = forgedOperationGroup.length / 2 + 64;
    const estimatedFee = Math.ceil(gas / 10) + 100 + operationSize + 200;

    return { gas, storageCost, estimatedFee };
};
