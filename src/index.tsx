import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import './index.css';

import Router from './router';
import Theme from './context/Theme';
import Tezos from './context/Tezos';
import Deployment from './context/Deployment';
import CircularLoading from './components/common/Spinner';

const container = document.getElementById('root');
if (!container) {
    alert('Root <div/> missing!');
    throw new Error('Root <div/> missing!');
}

const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen">
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
);
