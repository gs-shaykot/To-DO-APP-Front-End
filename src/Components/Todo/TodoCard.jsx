import React, { useContext } from 'react';
import { ThemeContext } from '../../Provider/ThemeProvider';
import { FaPen } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import useTodo from '../../Hooks/useTodo';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoCard = ({ Alldata, handleEditClick, handleDelete }) => {
    const { theme } = useContext(ThemeContext);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: Alldata.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${theme === 'light' ? 'border-[#31353c] bg-[#1f2937] text-white' : 'border-[#374151] bg-base-100 text-black'} 
                        w-full border shadow-md box-border p-4 rounded-md mb-3`}
        >
            {/* Header with Title and Actions */}
            <div className='flex justify-between items-center mb-2'>
                <h1 className="font-semibold text-lg">{Alldata?.title}</h1>
                <div className='flex gap-2 text-gray-500 cursor-pointer'>
                    <FaPen className="hover:text-blue-500" onClick={() => handleEditClick(Alldata)} />
                    <MdDeleteForever onClick={() => handleDelete(Alldata?._id)} className="hover:text-red-500" />
                </div>
            </div>

            {/* Task Description */}
            <p className="text-sm mb-3">
                {Alldata?.description}
            </p>

            {/* Footer with Badge & Due Date */}
            <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 rounded-md bg-purple-200 text-purple-700">
                    {Alldata?.badge}
                </span>
                <p className="text-xs">Due: {Alldata?.dueDate}</p>
            </div>
        </div>
    );
};

export default TodoCard;