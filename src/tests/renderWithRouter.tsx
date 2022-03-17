import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import Routes from 'src/router/routes';

interface Props {
    path: string;
}

const renderWithRouter = ({ path }: Props) => {
    const Wrapper: React.FC = () => (
        <Suspense fallback={'Loading...'}>
            <HelmetProvider>
                <MemoryRouter initialEntries={[path]}>
                    <Routes />
                </MemoryRouter>
            </HelmetProvider>
        </Suspense>
    );

    return render(<Wrapper />);
};

export default renderWithRouter;
