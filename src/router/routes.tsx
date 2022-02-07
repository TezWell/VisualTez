import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Page from 'src/components/Page';
import EditorContext from 'src/context/Editor';
import AdaptableViewport from 'src/components/common/AdaptableViewport';

import PrivacyMarkdown from 'src/pages/markdown/privacy.md';
import ContactMarkdown from 'src/pages/markdown/contact.md';
import TermsMarkdown from 'src/pages/markdown/terms.md';
import MarkdownLayout from 'src/components/MarkdownLayout';
import { isDevelopment } from 'src/utils';

const EditorPage = React.lazy(() => import('src/pages/editor'));
const NodesPage = React.lazy(() => import('src/pages/nodes'));
const LandingPage = React.lazy(() => import('src/pages/landing/view'));
const NotFoundPage = React.lazy(() => import('src/pages/404'));
const DeployPage = React.lazy(() => import('src/pages/deploy'));

export const routes = [
    // Landing page
    {
        title: 'VisualTez',
        routeProps: {
            key: 'home',
            path: '/',
        },
        component: (
            <Page withNavigation withFooter>
                <LandingPage />
            </Page>
        ),
    },
    // Editor Page
    {
        disabled: !isDevelopment(),
        title: 'VisualTez - Editor',
        routeProps: {
            key: 'editor',
            path: '/editor',
        },
        component: (
            <AdaptableViewport minSize={768}>
                <Page withNavigation>
                    <EditorContext.Provider>
                        <EditorPage />
                    </EditorContext.Provider>
                </Page>
            </AdaptableViewport>
        ),
    },
    // Deploy Page
    {
        title: 'VisualTez - Deploy',
        routeProps: {
            key: 'deploy',
            path: '/deploy',
        },
        component: (
            <Page withNavigation>
                <DeployPage />
            </Page>
        ),
    },
    // Privacy Page
    {
        title: 'VisualTez - Privacy',
        routeProps: {
            key: 'privacy',
            path: '/privacy',
        },
        component: (
            <Page withNavigation withFooter>
                <MarkdownLayout markdown={PrivacyMarkdown} />
            </Page>
        ),
    },
    // Terms Page
    {
        title: 'VisualTez - Terms',
        routeProps: {
            key: 'terms',
            path: '/terms',
        },
        component: (
            <Page withNavigation withFooter>
                <MarkdownLayout markdown={TermsMarkdown} />
            </Page>
        ),
    },
    // Contact Page
    {
        title: 'VisualTez - Contact',
        routeProps: {
            key: 'contact',
            path: '/contact',
        },
        component: (
            <Page withNavigation withFooter>
                <MarkdownLayout markdown={ContactMarkdown} />
            </Page>
        ),
    },
    // Nodes Page
    {
        title: 'VisualTez - Nodes',
        routeProps: {
            key: 'nodes',
            path: '/nodes',
        },
        component: (
            <Page withNavigation withFooter>
                <NodesPage />
            </Page>
        ),
    },
    // Not Found Page
    {
        title: 'VisualTez - 404',
        routeProps: {
            key: '404',
            path: '*',
        },
        component: (
            <Page withNavigation withFooter>
                <NotFoundPage />
            </Page>
        ),
    },
];

const Routing = () => (
    <Routes>
        {routes
            .filter(({ disabled }) => !disabled)
            .map(({ title, routeProps, component }) => (
                <Route
                    {...routeProps}
                    element={
                        <>
                            <Helmet>
                                <title>{title}</title>
                            </Helmet>
                            {component}
                        </>
                    }
                />
            ))}
    </Routes>
);

export default Routing;
