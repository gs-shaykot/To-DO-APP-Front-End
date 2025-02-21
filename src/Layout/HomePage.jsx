import React, { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';
import Todo from '../Components/Todo';
import InProgress from '../Components/InProgress';
import Done from '../Components/Done';

const HomePage = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-[#f0f0f0] text-black'} h-auto pt-24 pb-10`}>
            <div className='grid grid-cols-3 gap-5 container mx-auto'>
                <Todo />
                <InProgress />
                <Done />
            </div>
        </div>
    );
};

export default HomePage;