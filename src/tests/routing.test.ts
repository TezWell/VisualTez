import { act, cleanup, waitFor } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import { routes } from 'src/router/routes';

// Mock crypto.getRandomValues

Object.defineProperty(window, 'crypto', {
    value: { getRandomValues: () => new Uint32Array(10) },
});

afterEach(cleanup);

describe('Application Routing', () => {
    test.each(routes.map((route) => [route.title, route]))(
        `Test Route %s`,
        async (_, route: any) => {
            let path = route.routeProps.path;

            if (route.routeProps.path === '*') {
                path = '/not-found';
            }

            const { getByRole } = renderWithRouter({ path });
            const el = await waitFor(() => getByRole('main'), { timeout: 20000 });
            // Snapshot pages that do not use blockly
            if (!['/editor', '/deploy'].includes(route.routeProps.path)) {
                expect(el).toMatchSnapshot();
            }
            await waitFor(() => expect(document.title || 'FAILED').toMatch(route.title), {
                timeout: 20000,
            });
        },
        20000,
    );
});
