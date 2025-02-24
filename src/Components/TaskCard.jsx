import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../Provider/ThemeProvider';

const TaskCard = ({ selectedTask, setSelectedTask }) => { 
    const { theme } = useContext(ThemeContext);
    const { register, handleSubmit, reset, setValue } = useForm();  
    
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

    const onSubmit = (data) => {
        console.log(data);
        if (selectedTask) {
            console.log("Updating Task...");
            setSelectedTask(null);
        } else {
            console.log("Adding Task...");
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
                            {...register("description", { required: true })}
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
