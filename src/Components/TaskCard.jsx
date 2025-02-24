import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../Provider/ThemeProvider';
import useAxiosPublic from '../0.Original Components/hooks/useAxiosPublic';

const TaskCard = ({ selectedTask, setSelectedTask, refetch }) => {
    const { theme } = useContext(ThemeContext);
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosPub = useAxiosPublic()
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
        if (selectedTask) {
            console.log("Updating Task...");
            setSelectedTask(null);
        }
        else {
            const FinalData = { ...data, status: "Todo" }
            console.log("This Will be added: ", FinalData)
            const res = await axiosPub.post('/addTask', FinalData)
            if (res.status === 200) {
                alert('posted')
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
