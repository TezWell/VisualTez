import { useContext } from 'react';

import Deployment from '../Deployment';

const useDeployment = () => {
    const context = useContext(Deployment.Context);
    if (context == null) {
        throw new Error('`deployment context` is not available.');
    }
    return context;
};

export default useDeployment;
