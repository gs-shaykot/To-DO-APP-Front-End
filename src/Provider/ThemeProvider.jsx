import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const handleToggle = () => {
        setTheme(theme === 'light' ? "dark" : "light")
    }

    const themeInfo = {
        theme,
        setTheme,
        handleToggle
    }

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;