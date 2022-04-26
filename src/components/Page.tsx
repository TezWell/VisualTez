import React from 'react';
import Navigation from './header';
import Footer from './footer';
import Main from './main';

interface PageProps {
    children?: React.ReactNode;
    withNavigation?: boolean;
    withFooter?: boolean;
}

const Page: React.FC<PageProps> = ({ withNavigation, withFooter, children }) => {
    return (
        <>
            {withNavigation ? <Navigation /> : null}
            <Main>{children}</Main>
            {withFooter ? <Footer /> : null}
        </>
    );
};

export default Page;
