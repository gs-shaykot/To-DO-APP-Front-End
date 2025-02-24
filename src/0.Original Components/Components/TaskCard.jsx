import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => { 
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-3 rounded shadow mb-2"
                >
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                    <span className={`text-xs ${task.badgeColor} p-1 rounded`}>
                        {task.badge}
                    </span>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
