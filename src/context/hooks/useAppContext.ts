import { useContext } from 'react';

import AppContext, { IAppContext } from '../AppContext';

function useAppContext(): IAppContext {
    const context = useContext<IAppContext>(AppContext);
    if (context == null) {
        throw new Error('`useAppContext` not available.');
    }
    return context;
}

export default useAppContext;
