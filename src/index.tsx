import * as React from 'react';
import { render } from 'react-dom';

import './blocks';
import './index.css';

import Router from './router';
import Theme from './context/Theme';
import Tezos from './context/Tezos';

render(
    <React.StrictMode>
        <Theme.Provider>
            <Tezos.Provider>
                <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen">
                    <Router />
                </div>
            </Tezos.Provider>
        </Theme.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
