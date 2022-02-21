import { waitFor } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import { routes } from 'src/router/routes';

// Mock crypto.getRandomValues

Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: () => new Uint32Array(10) },
});

describe('Application Routing', () => {
    routes
        .filter(({ disabled }) => !disabled)
        .forEach((route) => {
            let path = route.routeProps.path as string;
            let testDescription = `Test Route ${route.title}`;

            if (route.routeProps.path === '*') {
                path = '/not-found';
                testDescription = 'Test Non Existent Route';
            }

            it(testDescription, async () => {
                await renderWithRouter({
                    path,
                });
                await waitFor(async () => expect(document.title).toMatch(route.title));
            });
        });
});
