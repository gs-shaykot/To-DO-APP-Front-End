import React, { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';

const Done = () => {

    const { theme } = useContext(ThemeContext)

    return (
        <div className={`${theme === 'light' ? 'bg-gray-800 text-white border-b border-b-[#2a3443] ' : 'bg-base-100 text-black'}bg-[#1f2937] rounded-md`}>
            <div>
                <div className={`${theme === 'light' ? 'border-[#31353c]' : 'border-[#374151]'} border-b p-4`}>
                    <h1>Done</h1>
                </div>
            </div>
            <div className='p-5'>
                <div className={`${theme === 'light' ? 'border-[#31353c]' : 'border-[#374151]'} w-full h-24 border shadow-xl box-border p-3 rounded-md mb-3`}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ullam ratione iure pariatur fuga in!</p>
                </div>
                <div className={`${theme === 'light' ? 'border-[#31353c]' : 'border-[#374151]'} w-full h-24 border shadow-xl box-border p-3 rounded-md mb-3`}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ullam ratione iure pariatur fuga in!</p>
                </div>
                <div className={`${theme === 'light' ? 'border-[#31353c]' : 'border-[#374151]'} w-full h-24 border shadow-xl box-border p-3 rounded-md mb-3`}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ullam ratione iure pariatur fuga in!</p>
                </div>
            </div>
        </div>
    );
};

export default Done;