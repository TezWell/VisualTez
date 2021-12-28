import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MarkdownLayout from 'src/components/MarkdownLayout';

import Page from 'src/components/Page';
import NotFound from 'src/pages/404/view';
import Editor from 'src/pages/editor';
import Landing from 'src/pages/landing/view';

import PrivacyMarkdown from 'src/pages/markdown/privacy.md';
import ContactMarkdown from 'src/pages/markdown/contact.md';
import { getBaseURL } from 'src/utils/path';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path={getBaseURL()}
                element={
                    <Page withNavigation withFooter>
                        <Landing />
                    </Page>
                }
            />
            <Route
                path={`${getBaseURL()}/editor`}
                element={
                    <Page withNavigation>
                        <Editor />
                    </Page>
                }
            />
            <Route
                path={`${getBaseURL()}/privacy`}
                element={
                    <Page withNavigation withFooter>
                        <MarkdownLayout markdown={PrivacyMarkdown} />
                    </Page>
                }
            />
            <Route
                path={`${getBaseURL()}/contact`}
                element={
                    <Page withNavigation withFooter>
                        <MarkdownLayout markdown={ContactMarkdown} />
                    </Page>
                }
            />
            <Route
                path="*"
                element={
                    <Page withNavigation withFooter>
                        <NotFound />
                    </Page>
                }
            />
        </Routes>
    </BrowserRouter>
);

export default Router;
