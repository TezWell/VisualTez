import React, { createContext } from 'react';
import { DEFAULT_ORIGINATION_COSTS } from 'src/services/wallet/estimator';

import settings from 'src/settings.json';

export interface IDeploymentState {
    storageXML?: string;
    code?: string;
}

export interface IDeploymentContext {
    state: IDeploymentState;
    changeDeploymentState: (state: IDeploymentState) => void;
    parameters: Record<Field, number | string>;
    changeParameters: (parameters: Record<string, number | string>) => void;
}

export enum Field {
    Delegate = 'delegate',
    Amount = 'amount',
    Fee = 'fee',
    Gas_limit = 'gas_limit',
    Storage_limit = 'storage_limit',
}

const contextStub: IDeploymentContext = {
    state: {},
    changeDeploymentState: () => {
        // stub
    },
    parameters: {
        [Field.Delegate]: '',
        [Field.Amount]: 0,
        [Field.Fee]: DEFAULT_ORIGINATION_COSTS.Fee,
        [Field.Gas_limit]: DEFAULT_ORIGINATION_COSTS.Gas_limit,
        [Field.Storage_limit]: DEFAULT_ORIGINATION_COSTS.Storage_limit,
    },
    changeParameters: () => {
        // stub
    },
};

const Context = createContext<IDeploymentContext>(contextStub);

const DEPLOY_STORAGE_KEY = `${settings.storage_prefix}/deploy`;

/**
 * @description Fetch state from local storage.
 * @returns {IEditorStorage} state
 */
const fetchState = (): IDeploymentState => {
    const storage: IDeploymentState = JSON.parse(window.localStorage.getItem(DEPLOY_STORAGE_KEY) || '{}');

    // Set default renderer
    storage.storageXML ||= `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;

    return storage;
};

/**
 * @description Save state in the local storage.
 * @param {IEditorStorage} state
 * @returns {void}
 */
const saveState = (state: IDeploymentState): void => {
    globalThis.localStorage.setItem(DEPLOY_STORAGE_KEY, JSON.stringify(state));
};

const Provider: React.FC = (props) => {
    const [state, setState] = React.useState<IDeploymentState>(fetchState());
    const [parameters, setParameters] = React.useState<Record<string, number | string>>(contextStub.parameters);

    React.useEffect(() => {
        saveState(state);
    }, [state]);

    const changeState = (state: IDeploymentState) => {
        setState((s) => ({
            ...s,
            ...state,
        }));
    };

    const changeParameters = (_parameters: Record<string, number | string>) => {
        setParameters((p) => ({
            ...p,
            ..._parameters,
        }));
    };

    return (
        <Context.Provider
            value={{
                state,
                changeDeploymentState: changeState,
                parameters,
                changeParameters,
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
