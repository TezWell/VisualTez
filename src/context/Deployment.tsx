import React, { createContext } from 'react';
import { DEFAULT_ORIGINATION_COSTS } from 'src/services/wallet/estimator';

import settings from 'src/settings.json';
import { SelectivePartial } from 'src/typings/utils';

interface IDeploymentPersistentState {
    storageXML: string;
    code: string;
}

interface IDeployParameters {
    [Field.Delegate]: string;
    [Field.Balance]: number;
    [Field.Fee]: number;
    [Field.Gas_limit]: number;
    [Field.Storage_limit]: number;
}

interface IDeploymentState {
    code: string;
    storageXML: string;
    storage: string;
    deploying: boolean;
    error: string;
    parameters: SelectivePartial<IDeployParameters, Field.Delegate>;
    result: {
        address: string;
        operationHash: string;
    };
}

type DeploymentReducerAction =
    | {
          type: DeploymentActionKind.UPDATE_PARAMETERS;
          payload: Partial<IDeployParameters>;
      }
    | {
          type: DeploymentActionKind.UPDATE_STATE;
          payload: Partial<IDeploymentState>;
      }
    | {
          type: DeploymentActionKind.UPDATE_RESULT;
          payload: {
              address?: string;
              operationHash?: string;
          };
      };

interface IDeploymentContext {
    state: IDeploymentState;
    dispatch: React.Dispatch<DeploymentReducerAction>;
}

export enum DeploymentActionKind {
    UPDATE_PARAMETERS = 'DEPLOY__UPDATE_PARAMETERS__ACTION',
    UPDATE_STATE = 'DEPLOY__UPDATE_STATE__ACTION',
    UPDATE_RESULT = 'DEPLOY__UPDATE_RESULT__ACTION',
}

export enum Field {
    Delegate = 'delegate',
    Balance = 'balance',
    Fee = 'fee',
    Gas_limit = 'gasLimit',
    Storage_limit = 'storageLimit',
}

const contextStub: IDeploymentContext = {
    state: {
        code: '',
        storageXML: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
        storage: '',
        deploying: false,
        error: '',
        parameters: {
            [Field.Balance]: 0,
            [Field.Fee]: DEFAULT_ORIGINATION_COSTS.Fee / 1_000_000,
            [Field.Gas_limit]: DEFAULT_ORIGINATION_COSTS.Gas_limit,
            [Field.Storage_limit]: DEFAULT_ORIGINATION_COSTS.Storage_limit,
        },
        result: {
            address: '',
            operationHash: '',
        },
    },
    dispatch: () => {
        // stub
    },
};

const Context = createContext<IDeploymentContext>(contextStub);

const DEPLOY_STORAGE_KEY = `${settings.storage_prefix}/deploy`;

/**
 * @description Fetch persistent state from local storage.
 * @returns {SelectivePartial<IDeploymentPersistentState, 'code'>}
 */
const fetchPersistentState = (): SelectivePartial<IDeploymentPersistentState, 'code'> => {
    const storage: Partial<IDeploymentPersistentState> = JSON.parse(
        window.localStorage.getItem(DEPLOY_STORAGE_KEY) || '{}',
    );

    // Set default renderer
    storage.storageXML ||= `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;

    return storage as SelectivePartial<IDeploymentPersistentState, 'code'>;
};

/**
 * @description Save state in the local storage.
 * @param {Partial<IDeploymentPersistentState>} state
 * @returns {void}
 */
const persistState = (state: Partial<IDeploymentPersistentState>): void => {
    globalThis.localStorage.setItem(DEPLOY_STORAGE_KEY, JSON.stringify(state));
};

/**
 * @description State reducer
 * @param state Previous state
 * @param action An action to be performed
 * @returns New state
 */
const reducer = (state: IDeploymentState, action: DeploymentReducerAction): IDeploymentState => {
    switch (action.type) {
        case DeploymentActionKind.UPDATE_PARAMETERS:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    ...action.payload,
                },
            };
        case DeploymentActionKind.UPDATE_RESULT:
            return {
                ...state,
                result: {
                    ...state.result,
                    ...action.payload,
                },
            };
        case DeploymentActionKind.UPDATE_STATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

const Provider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(reducer, {
        ...contextStub.state,
        ...fetchPersistentState(),
    });

    React.useEffect(() => {
        persistState({
            code: state.code,
            storageXML: state.storageXML,
        });
    }, [state.code, state.storageXML]);

    return (
        <Context.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

const Deployment = {
    Context,
    Provider,
};

export default Deployment;
