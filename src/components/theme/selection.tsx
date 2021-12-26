import React from 'react';

import { SunIcon, MoonIcon } from '@heroicons/react/outline';

import useTheme from 'src/context/hooks/useTheme';
import { ThemeKind } from 'src/context/Theme';

const ThemeSelection = () => {
    const { theme, changeTheme } = useTheme();

    return (
        <button
            type="button"
            className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            onClick={() => changeTheme(theme === ThemeKind.Dark ? ThemeKind.Light : ThemeKind.Dark)}
        >
            <span className="sr-only">Theme Selection</span>
            {theme === ThemeKind.Dark ? (
                <MoonIcon className="block h-6 w-6 " aria-hidden="true" />
            ) : (
                <SunIcon className="block h-6 w-6 " aria-hidden="true" />
            )}
        </button>
    );
};

export default ThemeSelection;
