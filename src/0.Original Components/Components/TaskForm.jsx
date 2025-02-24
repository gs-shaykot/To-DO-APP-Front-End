import React from 'react';

const TaskForm = () => {
    return (
        <div>
            <dialog id="task_modal" className="modal">
                <div className={` modal-box`}>
                    <form onSubmit={selectedTask ? handleUpdate : handleSubmit}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Title</span></label>
                            <input
                                required={true}
                                type="text"
                                name='title'
                                placeholder="Title"
                                className={`input input-bordered w-full`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Badge</span></label>
                            <input
                                required={true}
                                type="text"
                                name='badge'
                                placeholder="Badge"
                                className={`input input-bordered`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Due Date</span></label>
                            <input
                                required={true}
                                type="date"
                                name='dueDate'
                                className={`input input-bordered w-full`} />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea
                                required={true}
                                name='description'
                                placeholder="Description"
                                className={`textarea textarea-bordered w-full`}>
                            </textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Submit</button>
                        </div>

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("task_modal").close()}>✕</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default TaskForm;