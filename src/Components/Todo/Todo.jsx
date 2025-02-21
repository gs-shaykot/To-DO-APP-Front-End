import React, { useContext, useState } from 'react';
import TodoCard from './TodoCard';
import { v4 as uuidv4 } from 'uuid';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { ThemeContext } from '../../Provider/ThemeProvider';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Todo = ({ tasks, refetch }) => {
    const { theme } = useContext(ThemeContext);
    const axiosPub = useAxiosPublic();

    const [selectedTask, setSelectedTask] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const newTask = {
            ...data,
            id: uuidv4(),
        };
        try {
            await axiosPub.post('/addTask', newTask);
            e.target.reset();
            await refetch();
            document.getElementById("task_modal").close();
        } catch (error) {
            alert(`Failed to add task: ${error.message}`);
        }
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        document.getElementById("task_modal").showModal();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
        const newUpdatedTask = {
            ...updatedData,
            id: selectedTask.id,
        };

        try {
            await axiosPub.put(`/addTask/${selectedTask._id}`, newUpdatedTask);
            await refetch();
            e.target.reset();
            document.getElementById("task_modal").close();
            setSelectedTask(null);
        } catch (error) {
            alert(`Failed to update task: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axiosPub.delete(`/addTask/${id}`);
            if (res.data.acknowledged) {
                await refetch();
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

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

            <div className='p-5'>
                <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    {
                        tasks?.map((data) => (
                            <TodoCard
                                key={data.id}
                                Alldata={data}
                                handleEditClick={handleEditClick}
                                handleDelete={handleDelete}></TodoCard>
                        ))
                    }
                </SortableContext>
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