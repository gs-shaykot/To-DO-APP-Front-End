import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useTodo from '../Hooks/useTodo';
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
    const { theme } = useContext(ThemeContext);
    const axiosPub = useAxiosPublic();
    const [AllTasks, isPending, refetch] = useTodo();

    // 🔹 state to track selected task for editing
    const [selectedTask, setSelectedTask] = useState(null);

    // 🔹 Handle Add Task Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await axiosPub.post('/addTask', data); 
            e.target.reset();
            refetch();
            document.getElementById("task_modal").close();
        } catch (error) {
            alert(`Failed to add task: ${error.message}`);
        }
    };

    // 🔹 Open Edit Modal and Pre-fill Form
    const handleEditClick = (task) => {
        setSelectedTask(task);
        document.getElementById("task_modal").showModal();
    };

    // 🔹 Handle Update Task
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            await axiosPub.put(`/addTask/${selectedTask._id}`, updatedData);
            alert('Task Updated Successfully');
            refetch();
            document.getElementById("task_modal").close();
            setSelectedTask(null);
        } catch (error) {
            alert(`Failed to update task: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        const res = await axiosPub.delete(`/addTask/${id}`)
        console.log(res)
        if (res.data.acknowledged === true) {
            refetch()
        }
    }

    return (
        <div className={`${theme === 'light' ? 'bg-gray-800 text-white border-b border-b-[#2a3443]' : 'bg-base-100 text-black'} rounded-md`}>
            <div>
                <div className={`${theme === 'light' ? 'border-[#31353c]' : 'border-[#374151]'} border-b p-4 flex justify-between items-center`}>
                    <h1>To Do</h1>
                    <button
                        onClick={() => { setSelectedTask(null); document.getElementById('task_modal').showModal(); }}
                        className='bg-transparent border-0 p-1 hover:bg-transparent rounded-full'
                    >
                        <IoIosAddCircleOutline className={`${theme === 'light' ? 'text-white' : 'text-black'} text-2xl bg-transparent`} />
                    </button>
                </div>
            </div>

            <div className={`p-5`}>
                {
                    AllTasks.map((data) => (
                        <div
                            key={data._id}
                            className={`${theme === 'light' ? 'border-[#31353c] text-white' : 'border-[#374151] bg-base-100 text-black'} 
                        w-full border shadow-md box-border p-4 rounded-md mb-3`}
                        >
                            {/* Header with Title and Actions */}
                            <div className='flex justify-between items-center mb-2'>
                                <h1 className="font-semibold text-lg">{data.title}</h1>
                                <div className='flex gap-2 text-gray-500 cursor-pointer'>
                                    <FaPen className="hover:text-blue-500" onClick={() => handleEditClick(data)} />
                                    <MdDeleteForever onClick={() => handleDelete(data._id)} className="hover:text-red-500" />
                                </div>
                            </div>

                            {/* Task Description */}
                            <p className="text-sm mb-3">
                                {data.description}
                            </p>

                            {/* Footer with Badge & Due Date */}
                            <div className="flex justify-between items-center">
                                <span className="text-xs px-2 py-1 rounded-md bg-purple-200 text-purple-700">
                                    {data.badge}
                                </span>
                                <p className="text-xs">Due {data.dueDate}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <dialog id="task_modal" className="modal">
                <div className={`${theme === 'light' ? '!bg-[#1f2937] text-white' : ''} modal-box`}>
                    <form onSubmit={selectedTask ? handleUpdate : handleSubmit}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Title</span></label>
                            <input
                                required={true}
                                type="text"
                                name='title'
                                defaultValue={selectedTask?.title || ''}
                                placeholder="Title"
                                className={`${theme === 'light' ? '!bg-[#374151] text-white' : ''} input input-bordered w-full`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Badge</span></label>
                            <input
                                required={true}
                                type="text"
                                name='badge'
                                defaultValue={selectedTask?.badge || ''}
                                placeholder="Badge"
                                className={`${theme === 'light' ? '!bg-[#374151] text-white' : ''} input input-bordered`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Due Date</span></label>
                            <input
                                required={true}
                                type="date"
                                name='dueDate'
                                defaultValue={selectedTask?.dueDate || ''}
                                className={`${theme === 'light' ? '!bg-[#374151] text-white' : ''} input input-bordered w-full`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea
                                required={true}
                                name='description'
                                defaultValue={selectedTask?.description || ''}
                                placeholder="Description"
                                className={`${theme === 'light' ? '!bg-[#374151] text-white' : ''} textarea textarea-bordered w-full`}>
                            </textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">{selectedTask ? "Update Task" : "Add Task"}</button>
                        </div>

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("task_modal").close()}>✕</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Todo;
