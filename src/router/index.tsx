import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routes';

import { getBaseURL } from 'src/utils/path';

const Router = () => (
    <BrowserRouter basename={getBaseURL()}>
        <Routing />
    </BrowserRouter>
);

export default Router;
