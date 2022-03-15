import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import ThemeSelection from 'src/components/theme/selection';
import { isDevelopment } from 'src/utils';
import { resolvePath } from 'src/utils/path';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    return (
        <nav id="header" className="w-full">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between p-2">
                <div className="pl-4 flex items-center">
                    <Link to="/">
                        <img className="h-10 md:h-16" src={resolvePath('/assets/logo.svg')} />
                    </Link>
                </div>
                <div className="flex justify-center items-center lg:hidden pr-4">
                    <Menu as="div" className="relative h-10">
                        <Menu.Button>
                            <svg
                                className="block fill-current h-10"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    <NavLink
                                        className="inline-block w-full rounded font-bold no-underline p-2 bg-gray-200 dark:bg-gray-800"
                                        to="/editor"
                                    >
                                        Editor
                                    </NavLink>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <div className="relative h-10 border ml-3 mr-3 border-black dark:border-white" />
                    <div className="block lg:hidden">
                        <ThemeSelection />
                    </div>
                </div>
                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 z-20"
                    id="nav-content"
                >
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li>
                            <NavLink className="flex inline-block py-2 px-4 font-bold no-underline" to="/editor">
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
