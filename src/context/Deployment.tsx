import React, { createContext } from 'react';

export interface IDeploymentState {
    storageXML?: string;
    code?: string;
}

export interface IDeploymentContext {
    state: IDeploymentState;
    changeDeploymentState: (state: IDeploymentState) => void;
}

const contextStub: IDeploymentContext = {
    state: {},
    changeDeploymentState: () => {
        // stub
    },
};
const Context = createContext<IDeploymentContext>(contextStub);

const Provider: React.FC = (props) => {
    const [state, setState] = React.useState<IDeploymentState>({});

    const changeState = (state: IDeploymentState) => {
        setState((s) => ({
            ...s,
            ...state,
        }));
    };

    return (
        <Context.Provider
            value={{
                state,
                changeDeploymentState: changeState,
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
