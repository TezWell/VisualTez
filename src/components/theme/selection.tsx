import React from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

import useTheme from 'src/context/hooks/useTheme';
import { ThemeKind } from 'src/context/Theme';

interface ThemeSelectionProps {
    onlyIcons?: boolean;
}

const ThemeSelection: React.FC<ThemeSelectionProps> = ({ onlyIcons = false }) => {
    const { isDark, changeTheme } = useTheme();

    return (
        <Switch
            checked={isDark}
            onChange={() => changeTheme(isDark ? ThemeKind.Light : ThemeKind.Dark)}
            className={'relative border p-2 text-black dark:text-white inline-flex items-center rounded-full'}
        >
            <span className="sr-only">Theme Selection</span>
            {isDark ? (
                <>
                    <SunIcon className="block h-5 w-5 font-extrabold" aria-hidden="true" />
                    {!onlyIcons ? <p className="ml-1 font-extrabold">Light</p> : null}
                </>
            ) : (
                <>
                    <MoonIcon className="block h-5 w-5 font-extrabold" aria-hidden="true" />
                    {!onlyIcons ? <p className="ml-1 font-extrabold">Dark</p> : null}
                </>
            )}
        </Switch>
    );
};

export default ThemeSelection;
