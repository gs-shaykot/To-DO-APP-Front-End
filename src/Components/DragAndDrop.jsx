// explain each & every steps of this code. with sample example. start with the return part.
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './../Provider/ThemeProvider';
import useTodo from '../0.Original Components/Hooks/useTodo';

const DragAndDrop = () => {

    const initialData = [
        {
            "id": "67b94b836bd413b875d8c4c7",
            "title": "Design new landing page",
            "description": "Create a modern and engaging landing page design for our new product launch",
            "badge": "Design",
            "dueDate": "2025-02-28",
            "status": "Todo",
        },
        {
            "id": "67b94b836bd413b875d8c4c8",
            "title": "Update user documentation",
            "description": "Review and update the existing user documentation with new features",
            "badge": "Documentation",
            "dueDate": "2025-02-22",
            "status": "Todo",
        },
        {
            "id": "67b9aca2acaaf23e2cc662c9",
            "title": "test task",
            "badge": "test",
            "dueDate": "2025-02-22",
            "description": "adaf fafafadf sd fa",
            "status": "Todo",
        },
        {
            "id": "67b9af76cda7114107423c1e",
            "title": "akil test",
            "badge": "test",
            "dueDate": "2025-02-22",
            "description": "adjklkjdad lfadf",
            "status": "Todo",
        },
        {
            "id": "67b9bbd1de4540601895f546",
            "title": "asdasda",
            "badge": "dassdasd",
            "dueDate": "2025-02-22",
            "description": "asda sdasd asd",
            "status": "Todo",
        },
        {
            "id": "67bc78967405325daa2f77bf",
            "title": "Design new landing page",
            "description": "Create a modern and engaging landing page design for our new product launch",
            "badge": "Design",
            "dueDate": "2025-02-28",
            "status": "Done",
        },
        {
            "id": "67bc78967405325daa2f77c0",
            "title": "adhajdhkajdhajskda",
            "description": "Create a modern and engaging landing page design for our new product launch",
            "badge": "Design",
            "dueDate": "2025-02-28",
            "status": "In Progress",
        }
    ]

    const [AllTasks, isPending, refetch] = useTodo()
    const [tasks, setTasks] = useState([]);
    const { theme } = useContext(ThemeContext)
    useEffect(() => {
        if (AllTasks.length > 0) {
            setTasks(AllTasks); // Update tasks when data is fetched
        }
    }, [AllTasks]);

    const columns = {
        Todo: 'Todo',
        'In Progress': 'In Progress',
        Done: 'Done',
    };

    const getItemsForColumn = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    // const handleDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;
    //     if (!destination) return;

    //     if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //         return; // If dropped at the same position, do nothing
    //     }

    //     // Clone tasks to avoid modifying state directly
    //     const updatedTasks = [...tasks];

    //     // Find the dragged item and remove it from the list
    //     const draggedItemIndex = updatedTasks.findIndex(task => task.id === draggableId);
    //     const draggedItem = updatedTasks[draggedItemIndex];
    //     updatedTasks.splice(draggedItemIndex, 1);

    //     // Update status to match the destination column
    //     draggedItem.status = destination.droppableId;

    //     // Get all tasks in the destination column (sorted correctly)
    //     const destinationColumnItems = updatedTasks.filter(task => task.status === destination.droppableId);

    //     // Calculate the correct index to insert
    //     let insertIndex = destination.index;
    //     if (insertIndex > destinationColumnItems.length) {
    //         insertIndex = destinationColumnItems.length; // If dragging beyond the last item, add to the end
    //     }

    //     // Find the index where to insert in the main `updatedTasks` array
    //     const actualInsertIndex = updatedTasks.findIndex(
    //         (task, index) =>
    //             task.status === destination.droppableId &&
    //             destinationColumnItems.indexOf(task) === insertIndex
    //     );

    //     // If actualInsertIndex is not found, place at the end
    //     const finalIndex = actualInsertIndex !== -1 ? actualInsertIndex : updatedTasks.length;

    //     // Insert the dragged item at the correct position
    //     updatedTasks.splice(finalIndex, 0, draggedItem);

    //     // Update state
    //     setTasks(updatedTasks);
    // };

    const handleDragEnd = (result) => {
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
                                <h3 className='border-b border-black mb-3 p-2'>{columnId}</h3>
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
                                                <h4 className='text-lg font-semibold'>{item.title}</h4>
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
    );
};

export default DragAndDrop;