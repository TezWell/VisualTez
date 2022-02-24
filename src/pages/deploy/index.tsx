import type { WalletOriginateParams } from '@taquito/taquito';
import type { Workspace, WorkspaceSvg } from 'blockly';
import React from 'react';

import { extractBlocks } from 'src/blocks';
import Michelson from 'src/blocks/generators/Michelson';
import { DeploymentActionKind } from 'src/context/Deployment';
import Editor from 'src/context/Editor';
import useDeployment from 'src/context/hooks/useDeployment';
import useTezos from 'src/context/hooks/useTezos';
import { deployContract } from 'src/services/wallet';
import Logger from 'src/utils/logger';
import EditorView from './view';

const DeployContainer = () => {
    const { client, walletStatus } = useTezos();
    const { state, dispatch } = useDeployment();
    const workspaceRef = React.useRef<WorkspaceSvg>();

    const deploy = React.useCallback(async () => {
        if (workspaceRef.current && client.current) {
            // Start deployment
            dispatch({
                type: DeploymentActionKind.UPDATE_STATE,
                payload: {
                    deploying: true,
                    error: '',
                },
            });

            try {
                const blocks = extractBlocks(workspaceRef.current as Workspace);
                const code = JSON.parse(state.code || '{}');
                if (!code) {
                    throw new Error('Could not prepare contract code.');
                }
                const storage = blocks.map((block) => Michelson.translateValue(block).toJSON())?.[0];
                if (!storage) {
                    throw new Error('Could not generate initial storage.');
                }

                const params: WalletOriginateParams = {
                    code,
                    init: storage,
                    balance: String(state.parameters.balance),
                    fee: state.parameters.fee,
                    gasLimit: state.parameters.gasLimit,
                    storageLimit: state.parameters.storageLimit,
                    mutez: true,
                };
                if (state.parameters.delegate) {
                    params.delegate = state.parameters.delegate;
                }

                const result = await deployContract(client.current, params);

                dispatch({
                    type: DeploymentActionKind.UPDATE_RESULT,
                    payload: {
                        address: result.address,
                        operationHash: result.operationHash,
                    },
                });
            } catch (e: any) {
                Logger.debug(e);
                dispatch({
                    type: DeploymentActionKind.UPDATE_STATE,
                    payload: {
                        error: e?.message || e.toString(),
                    },
                });
            }

            // Tear down
            dispatch({
                type: DeploymentActionKind.UPDATE_STATE,
                payload: {
                    deploying: false,
                },
            });
        }
    }, [client, dispatch, state]);

    return (
        <Editor.Provider>
            <EditorView enabled={walletStatus.connected} deploy={deploy} workspaceRef={workspaceRef} />
        </Editor.Provider>
    );
};

export default DeployContainer;
