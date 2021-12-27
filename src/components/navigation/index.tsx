import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import ThemeSelection from 'src/components/theme/selection';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <nav id="header" className="w-full">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <Link
                        className="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        to="/"
                    >
                        VisualTez
                    </Link>
                </div>
                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 z-20"
                    id="nav-content"
                >
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li>
                            <NavLink className="inline-block py-2 px-4 font-bold no-underline" to="ide">
                                Editor
                            </NavLink>
                        </li>
                        <li className="h-10 border ml-3 mr-3 border-gray-100" />
                        <li className="flex justify-end items-center">
                            <ThemeSelection />
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
    );
};

export default Navigation;
