import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import ThemeSelection from 'src/components/theme/selection';
import { resolvePath } from 'src/utils/path';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <nav id="header" className="w-full">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <Link to="/">
                        <img className="h-10 md:h-16" src={resolvePath('/assets/logo.svg')} />
                    </Link>
                </div>
                <div className="block lg:hidden pr-4">
                    <button className="flex items-center p-1 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                        <svg
                            className=" block fill-current h-6 w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 z-20"
                    id="nav-content"
                >
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li>
                            <NavLink className="inline-block py-2 px-4 font-bold no-underline" to="/editor">
                                Editor
                            </NavLink>
                        </li>
                        <li className="h-10 border ml-3 mr-3 border-black dark:border-white" />
                        <li className="flex justify-end items-center">
                            <ThemeSelection />
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="border border-black dark:border-white" />
        </nav>
    );
};

export default Navigation;
