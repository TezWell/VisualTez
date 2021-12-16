import * as React from 'react';
import { render } from 'react-dom';

import Editor from './containers/Editor';
import AppProvider from './context/AppProvider';

import './blocks';
import './index.css';

render(
    <React.StrictMode>
        <AppProvider>
            <Editor />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
