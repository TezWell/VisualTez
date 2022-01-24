import * as React from 'react';
import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';

import Router from './router';
import Theme from './context/Theme';
import Tezos from './context/Tezos';
import Deployment from './context/Deployment';

render(
    <React.StrictMode>
        <React.Suspense fallback="...">
            <HelmetProvider>
                <Theme.Provider>
                    <Tezos.Provider>
                        <Deployment.Provider>
                            <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen">
                                <Router />
                            </div>
                        </Deployment.Provider>
                    </Tezos.Provider>
                </Theme.Provider>
            </HelmetProvider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root'),
);
