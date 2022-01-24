import React, { Suspense } from 'react';
import { render } from '@testing-library/react';

import Routes from 'src/router/routes';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

interface Props {
    path: string;
}

const renderWithRouter = ({ path }: Props) => {
    const Wrapper: React.FC = () => (
        <HelmetProvider>
            <Suspense fallback={'Loading...'}>
                <MemoryRouter initialEntries={[path]}>
                    <Routes />
                </MemoryRouter>
            </Suspense>
        </HelmetProvider>
    );

    return render(<Wrapper />);
};

export default renderWithRouter;
