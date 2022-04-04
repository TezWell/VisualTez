import React from 'react';

const NotFound = () => (
    <div className="flex-1 flex flex-col md:flex-row justify-center items-center">
        <h1 className="text-[4rem] md:text-[20rem] italic font-black tracking-widest diagonal-fractions">404</h1>
        <p>
            Page <b className="italic tracking-wider">{window.location.pathname}</b> does not exist!
        </p>
    </div>
);

export default NotFound;
