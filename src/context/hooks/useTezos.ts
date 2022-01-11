import { useContext } from 'react';

import Tezos from '../Tezos';

const useTezos = () => {
    const context = useContext(Tezos.Context);
    if (context == null) {
        throw new Error('`tezos context` is not available.');
    }
    return context;
};

export default useTezos;
