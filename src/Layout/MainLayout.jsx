import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../Provider/ThemeProvider';

const MainLayout = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`${theme === 'light' ? "bg-[#111827] text-white" : "bg-gray-100 text-black"} h-screen`}>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;