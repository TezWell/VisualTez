import * as React from 'react';
import { render } from 'react-dom';

import './blocks';
import './index.css';

import Router from './router';
import Theme from './context/Theme';

render(
    <React.StrictMode>
        <Theme.Provider>
            <div className="bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen">
                <Router />
            </div>
        </Theme.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
