import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../Provider/ThemeProvider';  
import useTodo from '../Hooks/useTodo';
import useAxiosPublic from '../Hooks/useAxiosPublic';
 
const TaskCard = ({ selectedTask, setSelectedTask, refetch }) => {
    const { theme } = useContext(ThemeContext);
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosPub = useAxiosPublic()
    const [AllTasks] = useTodo()

    useEffect(() => {
        if (selectedTask) {
            setValue("title", selectedTask.title || "");
            setValue("badge", selectedTask.badge || "");
            setValue("dueDate", selectedTask.dueDate || "");
            setValue("description", selectedTask.description || "");
        } else {
            reset();
        }
    }, [selectedTask, setValue, reset]);

    const onSubmit = async (data) => {
        const date = new Date();
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getFullYear()}`;
        const FinalData = {
            ...data,
            createdAt: formattedDate,
            order: AllTasks.length + 1
        } 
        if (selectedTask) {
            const res = await axiosPub.put(`/addTask/${selectedTask._id}`, FinalData)
            if (res.status === 200) {
                refetch(); // Refetch after update
                setSelectedTask(null); // Clear selected task
            }
        }
        else {
            const res = await axiosPub.post('/addTask', FinalData)
            if (res.status === 200) {
                refetch()
            }
        }
        reset();
        document.getElementById("my_modal_3").close();
    };

    return (
        <dialog id="my_modal_3" className="modal">
            <div className={`modal-box ${theme === 'light' ? 'bg-[#1f2937] text-white' : ''}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Title</span></label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            maxLength={50}
                            placeholder="Title"
                            className={`input input-bordered w-full ${theme === 'light' ? 'bg-[#374151] text-white' : ''}`}
                        />
                    </div>

                    {/* Badge */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Badge</span></label>
                        <input
                            type="text"
                            {...register("badge", { required: true })}
                            placeholder="Badge"
                            className={`input input-bordered w-full ${theme === 'light' ? 'bg-[#374151] text-white' : ''}`}
                        />
                    </div>

                    {/* Category Date */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">List Status</span></label>
                        <select
                            {...register("status", { required: true })}
                            className={`select select-bordered w-full ${theme === 'light' ? 'bg-[#374151] text-white' : ''}`}>
                            <option disabled>Select a initial Status</option>
                            <option>Todo</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Due Date</span></label>
                        <input
                            type="date"
                            {...register("dueDate", { required: true })}
                            className={`input input-bordered w-full ${theme === 'light' ? 'bg-[#374151] text-white' : ''}`}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Description</span></label>
                        <textarea
                            maxLength={200}
                            {...register("description")}
                            placeholder="Description"
                            className={`textarea textarea-bordered w-full ${theme === 'light' ? 'bg-[#374151] text-white' : ''}`}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">{selectedTask ? "Update Task" : "Add Task"}</button>
                    </div>
                </form>

                {/* Close Button */}
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => document.getElementById("my_modal_3").close()}
                >
                    ✕
                </button>
            </div>
        </dialog>
    );
};

export default TaskCard;
