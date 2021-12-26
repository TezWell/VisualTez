import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import WithNavigation from 'src/components/navigation/WithNavigation';
import Editor from 'src/pages/editor';
import Landing from 'src/pages/landing/view';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <WithNavigation>
                        <Editor />
                    </WithNavigation>
                }
            />
            <Route
                path="landing"
                element={
                    <WithNavigation>
                        <Landing />
                    </WithNavigation>
                }
            />
        </Routes>
    </BrowserRouter>
);

export default Router;
