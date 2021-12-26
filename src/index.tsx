import * as React from 'react';
import { render } from 'react-dom';

import './blocks';
import './index.css';

import Router from './router';
import Theme from './context/Theme';

render(
    <React.StrictMode>
        <Theme.Provider>
            <Router />
        </Theme.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
