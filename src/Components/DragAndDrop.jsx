import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './../Provider/ThemeProvider';
import useTodo from '../0.Original Components/Hooks/useTodo';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import TaskCard from './TaskCard';

const DragAndDrop = () => {

    const [AllTasks, isPending, refetch] = useTodo()
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (AllTasks.length > 0) {
            setTasks(AllTasks); // Update tasks when data is fetched
        }
    }, [AllTasks]);

    const openModal = () => {
        setSelectedTask(null)
        document.getElementById("my_modal_3").showModal(); // Show the modal
    };

    const handleEdit = (task) => {
        setSelectedTask(task)
        document.getElementById("my_modal_3").showModal();
    }

    const columns = {
        Todo: 'Todo',
        'In Progress': 'In Progress',
        Done: 'Done',
    };

    const getItemsForColumn = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    const handleDragEnd = (result) => {
        console.log(result)
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return; // If dropped at the same position, do nothing
        }

        // Clone tasks to avoid modifying state directly
        const updatedTasks = [...tasks];

        // Find the dragged item and remove it from the list
        const draggedItemIndex = updatedTasks.findIndex(task => task._id.toString() === draggableId);
        const draggedItem = updatedTasks[draggedItemIndex];
        updatedTasks.splice(draggedItemIndex, 1);

        // Update status to match the destination column
        draggedItem.status = destination.droppableId;

        // Get all tasks in the destination column (sorted correctly)
        const destinationColumnItems = updatedTasks.filter(task => task.status === destination.droppableId);

        // Calculate the correct index to insert
        let insertIndex = destination.index;
        if (insertIndex > destinationColumnItems.length) {
            insertIndex = destinationColumnItems.length; // If dragging beyond the last item, add to the end
        }

        // Find the index where to insert in the main `updatedTasks` array
        const actualInsertIndex = updatedTasks.findIndex(
            (task, index) =>
                task.status === destination.droppableId &&
                destinationColumnItems.indexOf(task) === insertIndex
        );

        // If actualInsertIndex is not found, place at the end
        const finalIndex = actualInsertIndex !== -1 ? actualInsertIndex : updatedTasks.length;

        // Insert the dragged item at the correct position
        updatedTasks.splice(finalIndex, 0, draggedItem);

        // Update state
        setTasks(updatedTasks);
    };


    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='grid grid-cols-3 gap-5 container mx-auto pb-10'>
                    {Object.values(columns).map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId} >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`${theme === 'light' ? "bg-[#1f2937] text-white" : "bg-white text-black"} shadow-xl rounded-2xl min-h-72`}
                                >
                                    <div className='flex justify-between items-center p-2 px-4 border-b border-black mb-3'>
                                        <h3>{columnId}</h3>
                                        <IoIosAddCircleOutline onClick={openModal} className='text-lg cursor-pointer' />
                                    </div>
                                    {getItemsForColumn(columnId).map((item, index) => (
                                        <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                    }}
                                                    className={`${theme === "light" ? 'bg-transparent' : 'bg-white'} border border-gray-400 p-2 m-3 rounded-lg `}
                                                >
                                                    <div className='flex justify-between items-center'>
                                                        <h4 className='text-lg font-semibold'>{item.title}</h4>
                                                        <div className='flex gap-2 justify-between items-center cursor-pointer'>
                                                            <FaPen onClick={() => handleEdit(item)} />
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                    <p className='my-2'>{item.description}</p>
                                                    <div className='flex justify-between'>
                                                        <span className={`badge bg-sky-400 text-blue-700 font-semibold`}>{item.badge}</span>
                                                        <h1 className='text-xs'>Due: {item.dueDate}</h1>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <TaskCard selectedTask={selectedTask} setSelectedTask={setSelectedTask} refetch={refetch} />
        </>
    );
};

export default DragAndDrop;