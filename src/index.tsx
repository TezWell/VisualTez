import * as React from 'react';
import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';

import Router from './router';
import Theme from './context/Theme';
import Tezos from './context/Tezos';
import Deployment from './context/Deployment';
import CircularLoading from './components/common/Spinner';

render(
    <React.StrictMode>
        <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col h-full">
            <React.Suspense fallback={<CircularLoading />}>
                <HelmetProvider>
                    <Theme.Provider>
                        <Tezos.Provider>
                            <Deployment.Provider>
                                <Router />
                            </Deployment.Provider>
                        </Tezos.Provider>
                    </Theme.Provider>
                </HelmetProvider>
            </React.Suspense>
        </div>
    </React.StrictMode>,
    document.getElementById('root'),
);
