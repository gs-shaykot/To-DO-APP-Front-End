import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks }) => { 
    return (
        <Droppable droppableId={title}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-1/3 bg-gray-200 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-blue-800">{title}</h2>
                    {tasks.map((task, index) => (
                        <TaskCard key={task._id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TaskColumn;
