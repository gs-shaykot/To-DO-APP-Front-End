import React, { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';

const HomePage = () => {
    const { theme, setTheme, handleToggle } = useContext(ThemeContext)
    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-base-100 text-black'} h-screen pt-28`}>
            <h1>Home Sweet Home</h1>
        </div>
    );
};

export default HomePage;