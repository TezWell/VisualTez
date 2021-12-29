import React from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

import useTheme from 'src/context/hooks/useTheme';
import { ThemeKind } from 'src/context/Theme';

const ThemeSelection = () => {
    const { isDark, changeTheme } = useTheme();

    return (
        <Switch
            checked={isDark}
            onChange={() => changeTheme(isDark ? ThemeKind.Light : ThemeKind.Dark)}
            className={'relative border pt-2 pb-2 text-black dark:text-white inline-flex items-center rounded-full'}
        >
            <span className="sr-only">Theme Selection</span>
            {isDark ? (
                <>
                    <SunIcon className="block h-5 w-5 ml-2 font-extrabold" aria-hidden="true" />
                    <p className="ml-1 mr-3 font-extrabold">Light</p>
                </>
            ) : (
                <>
                    <MoonIcon className="block h-5 w-5 ml-2 font-extrabold" aria-hidden="true" />
                    <p className="ml-1 mr-3 font-extrabold">Dark</p>
                </>
            )}
        </Switch>
    );
};

export default ThemeSelection;
