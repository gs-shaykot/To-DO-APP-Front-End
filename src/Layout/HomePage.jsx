import React, { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';
import Todo from '../Components/Todo/Todo';
import { closestCorners, DndContext } from '@dnd-kit/core';
import useTodo from '../Hooks/useTodo';
import InProgress from './../Components/InProgress/InProgress';
import Done from './../Components/Done/Done';

const HomePage = () => {
    const { theme } = useContext(ThemeContext)
    const [AllTasks, isPending, refetch] = useTodo();

    const handleDragEnd = async (e) => {
        const { active, over } = e;

        // Ensure the dragged task is not dropped in the same position
        if (active.id === over.id) return;

        // Get the dragged task and its new position
        const newOrder = [...AllTasks];
        const activeIndex = newOrder.findIndex((task) => task.id === active.id);
        const overIndex = newOrder.findIndex((task) => task.id === over.id);

        // Swap the tasks in the array
        const [removed] = newOrder.splice(activeIndex, 1);
        newOrder.splice(overIndex, 0, removed);

        // Optimistically update UI: Reorder tasks locally
        refetch();

        // Update the order on the backend
        try {
            // Assuming you have a field like 'order' or 'position' in your task object
            await axiosPub.put('/updateTaskOrder', {
                tasks: newOrder,
            });
        } catch (error) {
            console.error('Failed to update task order:', error);
        }
    };

    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-[#f0f0f0] text-black'} h-auto pt-24 pb-10 overflow-hidden`}>
            <div className='grid grid-cols-3 gap-5 container mx-auto'>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    <Todo AllTasks={AllTasks} refetch={refetch} />
                    <InProgress />
                    <Done />
                </DndContext>
            </div>
        </div>
    );
};

export default HomePage;