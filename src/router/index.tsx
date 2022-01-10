import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Page from 'src/components/Page';
import Landing from 'src/pages/landing/view';
import NotFound from 'src/pages/404';
import Editor from 'src/pages/editor';
import Deploy from 'src/pages/deploy';

import EditorContext from 'src/context/Editor';

import MarkdownLayout from 'src/components/MarkdownLayout';
import PrivacyMarkdown from 'src/pages/markdown/privacy.md';
import ContactMarkdown from 'src/pages/markdown/contact.md';
import TermsMarkdown from 'src/pages/markdown/terms.md';

import { getBaseURL } from 'src/utils/path';
import AdaptableViewport from 'src/components/common/AdaptableViewport';

const Router = () => (
    <BrowserRouter basename={getBaseURL()}>
        <Routes>
            <Route
                path="/"
                element={
                    <Page withNavigation withFooter>
                        <Landing />
                    </Page>
                }
            />
            <Route
                path="/editor"
                element={
                    <AdaptableViewport minSize={768}>
                        <Page withNavigation>
                            <EditorContext.Provider>
                                <Editor />
                            </EditorContext.Provider>
                        </Page>
                    </AdaptableViewport>
                }
            />
            <Route
                path="/deploy"
                element={
                    <Page withNavigation>
                        <Deploy />
                    </Page>
                }
            />
            <Route
                path="/privacy"
                element={
                    <Page withNavigation withFooter>
                        <MarkdownLayout markdown={PrivacyMarkdown} />
                    </Page>
                }
            />
            <Route
                path="/terms"
                element={
                    <Page withNavigation withFooter>
                        <MarkdownLayout markdown={TermsMarkdown} />
                    </Page>
                }
            />
            <Route
                path="/contact"
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
