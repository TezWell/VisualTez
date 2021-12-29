import React, { createContext } from 'react';

import settings from 'src/settings.json';

export enum ThemeKind {
    Dark = 'dark',
    Light = 'light',
    System = 'system',
}

export interface IThemeContext {
    theme: ThemeKind;
    changeTheme: (theme: ThemeKind) => void;
}

const contextStub: IThemeContext = {
    theme: ThemeKind.Dark,
    changeTheme: () => {
        // stub
    },
};
const Context = createContext<IThemeContext>(contextStub);

const THEME_STORAGE_KEY = `${settings.storage_prefix}/theme`;

/**
 * @description Fetch the theme from browser local storage, use @media as fallback.
 * @returns {ThemeKind} Selected theme
 */
const fetchTheme = (): ThemeKind =>
    (globalThis.localStorage.getItem(THEME_STORAGE_KEY) as ThemeKind | undefined) ||
    (window.matchMedia(`(prefers-color-scheme: ${ThemeKind.Dark})`) ? ThemeKind.Dark : ThemeKind.Light);

/**
 * @description Save the selected theme in the browser local storage or remove
 *              the previous selection if using the system default.
 * @param {ThemeKind} theme Selected theme
 * @returns {void}
 */
const saveTheme = (theme: ThemeKind): void => {
    if (theme === ThemeKind.System) {
        return globalThis.localStorage.removeItem(THEME_STORAGE_KEY);
    }
    globalThis.localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const Provider: React.FC = (props) => {
    const [theme, setTheme] = React.useState<ThemeKind>(fetchTheme());

    React.useEffect(() => {
        if (theme === ThemeKind.Dark) {
            document.documentElement.classList.add(ThemeKind.Dark);
            document.documentElement.classList.remove(ThemeKind.Light);
        } else {
            document.documentElement.classList.add(ThemeKind.Light);
            document.documentElement.classList.remove(ThemeKind.Dark);
        }
    }, [theme]);

    const changeTheme = React.useCallback((theme: ThemeKind) => {
        setTheme(theme);
        saveTheme(theme);
    }, []);

    return (
        <Context.Provider
            value={{
                theme,
                changeTheme,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

const Theme = {
    Context,
    Provider,
};

export default Theme;
