import * as React from 'react';
import { render } from 'react-dom';

import './blocks';
import './index.css';

import Router from './router';
import Theme from './context/Theme';

render(
    <React.StrictMode>
        <Theme.Provider>
            <div className="h-full bg-white dark:bg-black text-black dark:text-white">
                <Router />
            </div>
        </Theme.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
